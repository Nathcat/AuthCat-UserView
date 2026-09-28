import type { PageServerLoad } from "./$types";
import { logout } from "$lib/nathcat.net/oauth";

export const load: PageServerLoad = logout;
