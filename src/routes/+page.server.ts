import { authenticate_or_redirect } from "$lib/nathcat.net/oauth";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = authenticate_or_redirect;
