<script>
	import '../app.css';

	import { Client, cacheExchange, fetchExchange, setContextClient } from '@urql/svelte';

	const client = new Client({
		url: import.meta.env.VITE_GRAPHQL_URL,
		exchanges: [cacheExchange, fetchExchange]
	});

	setContextClient(client);
</script>

<slot />

<footer class="flex items-center justify-center m-10">
	<a href="https://portafolio-fjmg84.vercel.app/" class="font-light text-sm text-zinc-400"
		>developed and designed by: <span class="font-bold">fjmg84</span></a
	>
</footer>
