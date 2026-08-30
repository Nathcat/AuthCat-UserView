import type { PageServerLoad } from "./$types";
import Database from "better-sqlite3";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
  const db = new Database("auth.db", {});
  let row = db
    .prepare("SELECT * FROM AccessTokens WHERE `session` = ?")
    .bind(cookies.get("session"))
    .get();

  if (row === undefined) {
    redirect(302, "/login");
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
        .bind(cookies.get("session"))
        .run();
      redirect(302, "/login");
    } else if (response.status !== 200) {
      redirect(302, "/login");
    } else {
      return await response.json();
    }
  }
};
