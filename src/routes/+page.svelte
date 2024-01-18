<script lang="ts">
	import { getPostsByCategory, getAllPost } from '$lib/fetching';
	import { countCategories } from '$lib/services';
	import type { Meta, Post } from '$lib/types.js';

	const FILTER_ALL_POSTS = 'All';
	export let data;

	let { posts, categories } = data;
	let { page, pageCount } = data.meta.pagination;

	let categorySelected = FILTER_ALL_POSTS;

	const filterByCategory = (category: string) => async () => {
		let response: string | { posts: Post[]; meta: Meta } = '';

		if (category === FILTER_ALL_POSTS) {
			response = await getAllPost({ page: 1 });

			if (typeof response === 'string') return alert('Up sorry, :(');

			posts = response.posts;

			return;
		}

		response = await getPostsByCategory({ category });

		if (typeof response === 'string') return alert('Up sorry, :(');

		posts = response.posts;
		categorySelected = category;
	};

	const showMorePost = async () => {
		const response:
			| string
			| {
					posts: Post[];
					meta: Meta;
			  } = await getAllPost({ page: page + 1 });
		if (typeof response === 'string') return alert('Up sorry, :(');

		posts = [...posts, ...response.posts];
		page = response.meta.pagination.page;

		categories = countCategories({ posts });
	};
</script>

<main class="flex flex-col justify-center p-5 lg:p-10 gap-10">
	<h1 class="text-5xl font-extrabold flex items-end md:items-start flex-wrap">
		Welcome to <span
			class="underline text-5xl ml-2 mr-2 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
		>
			RESOURCES
		</span>
		<span class="text-sm font-thin">(fjmg)</span>
	</h1>

	<ul class="flex gap-5 flex-wrap">
		<li>
			<button
				on:click={filterByCategory(FILTER_ALL_POSTS)}
				class={`
				${categorySelected === FILTER_ALL_POSTS ? 'bg-zinc-800 text-white' : 'bg-white text-black'}
            capitalize flex items-center gap-5 bg-white text-black rounded-full w-auto px-2 py-1 text-nowrap
            `}
			>
				<p class="ml-5">{FILTER_ALL_POSTS}</p>
				<span
					class="bg-zinc-500 text-xs font-medium text-white w-8 h-8 rounded-full flex items-center justify-center"
					>{posts.length}</span
				>
			</button>
		</li>
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
						>{count >= 100 ? '+99' : count}</span
					>
				</button>
			</li>
		{/each}
	</ul>

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
					{#each categories as category}
						<li>
							<button
								on:click={() => filterByCategory(category)}
								class=" capitalize flex items-center justify-center bg-zinc-800 text-white rounded-full h-8 px-4 text-sm text-nowrap"
							>
								{category}
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

	<div class="flex justify-center items-center">
		{#if page < pageCount}
			<button
				class="bg-white text-zinc-800 rounded-full px-5 py-4 hover:text-white hover:bg-zinc-800 transition-all duration-300 ease-linear"
				on:click={showMorePost}
				>show me more <span class=" ml-2 bg-zinc-800 text-white px-3 py-3 rounded-full"
					>{page}/{pageCount}</span
				></button
			>
		{/if}
	</div>
</main>
