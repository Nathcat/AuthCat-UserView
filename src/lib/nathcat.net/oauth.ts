import type { PageServerLoad as RootServerLoad } from "../../routes/$types";
import type { PageServerLoad as LoginResponseServerLoad } from "../../routes/login/response/$types";
import type { PageServerLoad as LogoutServerLoad } from "../../routes/logout/$types";
import Database from "better-sqlite3";
import { redirect } from "@sveltejs/kit";
import { PUBLIC_CLIENT_ID } from "$env/static/public";
import { CLIENT_SECRET } from "$env/static/private";
import { v4 as uuid } from "uuid";

const db_file = "auth.db";
const session_cookie_name = "session";
const login_page_path = "/login";
const redirect_path_on_auth_complete = "/";

export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  verified: boolean;
  pfpPath: string;
};

export type FailStatus = {
  status: string;
  error: string;
};

/**
 * @brief Implementation of PageServerLoad which redirects with 302 login_page_path, when authentication fails. Authentication is performed via a session cookie token named "session". If successful, user data is returned.
 */
export const authenticate_or_redirect: RootServerLoad = async ({
  cookies,
}): Promise<User> => {
  const db = new Database(db_file, {});
  let row = db
    .prepare("SELECT * FROM AccessTokens WHERE `session` = ?")
    .bind(cookies.get(session_cookie_name))
    .get();

  if (row === undefined) {
    redirect(302, login_page_path);
  } else {
    let token = row.token;
    let response = await fetch("https://auth.nathcat.net/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) {
      db.prepare("DELETE FROM AccessTokens WHERE `token` = ?")
        .bind(cookies.get(session_cookie_name))
        .run();
      redirect(302, login_page_path);
    } else if (response.status !== 200) {
      redirect(302, login_page_path);
    } else {
      return await response.json();
    }
  }
};

/**
 * @brief Should be placed at the endpoint the OAuth server redirects to. This will handle the incoming error or auth grant code.
 */
export const oauth_response_handler: LoginResponseServerLoad = async ({
  url,
  cookies,
}): Promise<FailStatus> => {
  const grant = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return {
      status: "fail",
      error: error,
    };
  } else {
    let response: Response = await fetch(
      "https://auth.nathcat.net/token?grant_type=authorization_code&code=" +
        grant,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + PUBLIC_CLIENT_ID + ":" + CLIENT_SECRET,
        },
      },
    );

    if (response.status == 200) {
      let body = await response.json();
      let session = uuid();
      cookies.set(session_cookie_name, session, { path: "/" });

      const db = new Database(db_file, {});

      await db.exec(
        "INSERT INTO AccessTokens (`session`, `grant`, `token`) VALUES ('" +
          session +
          "', '" +
          grant +
          "', '" +
          body.access_token +
          "')",
      );

      redirect(302, redirect_path_on_auth_complete);
    } else {
      return {
        status: "fail",
        error: await response.text(),
      };
    }
  }
};

/**
 * @brief Logout a user.
 */
export const logout: LogoutServerLoad = async ({ cookies }): Promise<never> => {
  let session = cookies.get(session_cookie_name);
  if (session) {
    const db = new Database(db_file, {});
    db.prepare("DELETE FROM AccessTokens WHERE `session` = ?")
      .bind(session)
      .run();
    cookies.delete(session_cookie_name, { path: "/" });
    redirect(302, login_page_path);
  } else {
    redirect(302, redirect_path_on_auth_complete);
  }
};
