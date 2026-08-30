import Database from "better-sqlite3";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
  let session = cookies.get("session");
  if (session) {
    const db = new Database("auth.db", {});
    db.prepare("DELETE FROM AccessTokens WHERE `session` = ?")
      .bind(session)
      .run();
    cookies.delete("session", { path: "/" });
    redirect(302, "/login");
  } else {
    redirect(302, "/");
  }
};
