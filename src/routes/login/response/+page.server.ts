import type { PageServerLoad } from "./$types";
import { oauth_response_handler } from "$lib/nathcat.net/oauth";

export const load: PageServerLoad = oauth_response_handler;
