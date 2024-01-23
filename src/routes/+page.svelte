<script lang="ts">
	import { countCategories } from '$lib/services.js';
	import type { Connection, Post } from '$lib/types.js';
	import Scrapping from '../components/scrapping.svelte';
	import ListCategories from '../components/list-categories.svelte';
	import { FILTER_ALL_POSTS } from '$lib/constant';
	import ListPosts from '../components/list-posts.svelte';
	import Toast from '../components/toast.svelte';
	import { allPostQuery, getPostByCategoryQuery, paginationPostQuery } from '$lib/hygraph';

	export let data;
	export let form;

	let { categories, posts, meta, session } = data;
	let { pageSize, hasNextPage } = meta;

	let categorySelected = FILTER_ALL_POSTS;

	const filterByCategory = (category: string) => async () => {
		if (category === FILTER_ALL_POSTS) {
			const { posts: allPost }: { posts: Post[] } = await allPostQuery();
			posts = allPost;
			categorySelected = category;
			return;
		}

		const { posts: postsByCategory }: { posts: Post[] } = await getPostByCategoryQuery(category);

		posts = postsByCategory;
		categorySelected = category;
	};

	const showMorePost = async () => {
		let countPage = pageSize * 10;
		const { posts: newListPosts, postsConnection }: { posts: Post[]; postsConnection: Connection } =
			await paginationPostQuery(countPage);

		posts = newListPosts;
		pageSize = countPage;
		hasNextPage = postsConnection.pageInfo.hasNextPage;
		categories = countCategories({ posts });
	};
</script>

{#if session}
	<Scrapping />
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
			class="bg-white text-zinc-800 rounded-full px-5 py-4 hover:text-white hover:bg-zinc-800 transition-all duration-300 ease-linear"
			on:click={showMorePost}
			>show me more
		</button>
	{/if}
</div>
<Toast {form} />
