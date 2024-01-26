<script lang="ts">
	import { countCategories } from '$lib/services.js';
	import type { Post } from '$lib/types.js';
	import { getAllPostQuery } from '$lib/services';
	import { FILTER_ALL_POSTS } from '$lib/constant';
	import Scrapping from '../components/scrapping.svelte';
	import ListCategories from '../components/list-categories.svelte';
	import ListPosts from '../components/list-posts.svelte';
	import Toast from '../components/toast.svelte';
	import type { ActionData } from './$types.js';

	export let data;
	export let form;

	let { categories, posts, meta, session } = data;
	let { pageSize, hasNextPage } = meta;

	let categorySelected = FILTER_ALL_POSTS;

	const filterByCategory = (category: string) => async () => {
		let countPage = pageSize >= 10 ? 10 : pageSize + 10;

		try {
			const response = await getAllPostQuery({
				page: countPage,
				category: category === FILTER_ALL_POSTS ? '' : category
			});

			if (response?.error) return;

			if (response.posts) {
				posts = response.posts;
				pageSize = countPage;
				categorySelected = category;
				hasNextPage = response.infoPage?.hasNextPage;
				categories = countCategories({ posts: response.posts });
			}

			return;
		} catch (error) {
			console.log(error);
			form = error as ActionData;
			return;
		}
	};

	const pagination = (category: string) => async () => {
		let countPage = pageSize + 10;

		try {
			const response = await getAllPostQuery({
				page: countPage,
				category: category === FILTER_ALL_POSTS ? '' : category
			});

			if (response?.error) return;

			if (response.posts) {
				posts = response.posts;
				pageSize = countPage;
				hasNextPage = response.infoPage?.hasNextPage;
				categories = countCategories({ posts: response.posts });
			}
			return;
		} catch (error) {
			console.log(error);
			form = error as ActionData;
			return;
		}
	};
</script>

{#if session}
	<Scrapping {categories} />
{/if}

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
	<ListCategories {categories} {categorySelected} {filterByCategory} />
</ul>

<ListPosts {posts} {filterByCategory} />

<div class="flex justify-center items-center">
	{#if hasNextPage}
		<button
			class="flex items-center gap-2 text-zinc-800 bg-white py-2 px-5 rounded-full hover:bg-zinc-800 hover:text-white transition-all duration-300 ease-linear"
			on:click={pagination(categorySelected)}
			>show me more
		</button>
	{/if}
</div>
<Toast {form} />
