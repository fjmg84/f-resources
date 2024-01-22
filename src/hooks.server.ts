import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { CLIENT_ID, SECRET_ID } from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [Google({ clientId: CLIENT_ID, clientSecret: SECRET_ID })]
});
