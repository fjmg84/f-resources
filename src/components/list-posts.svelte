<script lang="ts">
	import type { Post } from '$lib/types';
	import type { MouseEventHandler } from 'svelte/elements';

	export let posts: Post[],
		filterByCategory: (arg0: string) => MouseEventHandler<HTMLButtonElement> | null | undefined;

	console.log(posts);
</script>

<ul class="flex flex-wrap gap-5 items-start justify-center">
	{#if posts.length === 0}
		<h1 class="text-red-500 text-2xl italic">
			"{'There is no data to show for this category yet, sorry :('}"
		</h1>
	{/if}

	{#each posts as { categories, image, description, title, link, free }}
		<li
			class="relative p-5 flex flex-col gap-5 border-solid border-2 border-gray-700 rounded-lg max-w-[410px]"
		>
			<img src={image} alt={image} />
			<p class="text-md italic">
				{description}
			</p>
			<div class="flex">
				<a
					target="_blank"
					href={link}
					class="flex items-center gap-2 text-zinc-800 bg-white py-2 px-5 rounded-full hover:bg-zinc-800 hover:text-white transition-all duration-300 ease-linear"
					>{title}
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"
						/></svg
					>
				</a>
			</div>

			<ul class="flex flex-wrap gap-2">
				{#each categories as { name }}
					<li>
						<button
							on:click={filterByCategory(name)}
							class=" capitalize flex items-center justify-center bg-zinc-800 text-white rounded-full h-8 px-4 text-sm text-nowrap"
						>
							{name}
						</button>
					</li>
				{/each}
			</ul>

			<div>
				<span class={`${!free && 'hidden'} bg-red-700 px-3 py-1 rounded-3xl font-medium text-sm`}
					>free</span
				>
			</div>
		</li>
	{/each}
</ul>
