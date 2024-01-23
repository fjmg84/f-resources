<script lang="ts">
	import type { Category } from '$lib/types';
	import type { MouseEventHandler } from 'svelte/elements';

	export let categories: Category[],
		categorySelected: string,
		filterByCategory: (arg0: string) => MouseEventHandler<HTMLButtonElement> | null | undefined;
</script>

{#each categories as { name, count }}
	<li>
		<button
			on:click={filterByCategory(name)}
			class={`
                ${categorySelected === name ? 'bg-zinc-800 text-white' : 'bg-white text-black'}
                capitalize flex items-center gap-5 bg-white text-black rounded-full w-auto px-2 py-1 text-nowrap`}
		>
			<p class="ml-5">{name}</p>
			<span
				class="bg-zinc-500 text-xs font-medium text-white w-8 h-8 rounded-full flex items-center justify-center"
				>{count && count >= 100 ? '+99' : count}</span
			>
		</button>
	</li>
{/each}
