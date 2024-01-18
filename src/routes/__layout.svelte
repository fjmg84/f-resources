<script>
	import { Client, cacheExchange, fetchExchange } from '@urql/svelte';

	const client = new Client({
		url: import.meta.env.VITE_GRAPHQL_URL,
		exchanges: [cacheExchange, fetchExchange]
	});

	console.log(client);
</script>
