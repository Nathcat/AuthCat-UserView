import type { PageServerLoad } from "./$types";
import { PUBLIC_CLIENT_ID } from "$env/static/public";
import { CLIENT_SECRET } from "$env/static/private";
import { v4 as uuid } from "uuid";
import Database from "better-sqlite3";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url, cookies }) => {
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
      cookies.set("session", session, { path: "/" });

      const db = new Database("auth.db", {});

      await db.exec(
        "INSERT INTO AccessTokens (`session`, `grant`, `token`) VALUES ('" +
          session +
          "', '" +
          grant +
          "', '" +
          body.access_token +
          "')",
      );

      redirect(302, "/");
    } else {
      return {
        status: "fail",
        error: await response.text(),
      };
    }
  }
};
