<script lang="ts">
	import { ALL_POSTS_QUERY, POSTS_BY_CATEGORY_QUERY } from '$lib/queries.js';
	import { countCategories } from '$lib/services.js';
	import type { Connection, Post } from '$lib/types.js';
	import { GraphQLClient } from 'graphql-request';
	import Scrapping from '../components/scrapping.svelte';
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import type { ToastType } from 'svelte-toasts/types/common';
	import ListCategories from '../components/list-categories.svelte';
	import { FILTER_ALL_POSTS } from '$lib/constant';

	export let data;
	export let form;

	let { categories, posts, meta, session } = data;
	let { pageSize, hasNextPage } = meta;

	let categorySelected = FILTER_ALL_POSTS;

	const hygraph = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
		headers: {}
	});

	const showToast = ({
		title,
		description,
		type
	}: {
		title: string;
		description: string;
		type: ToastType;
	}) => {
		toasts.add({
			title,
			description,
			duration: 10000, // 0 or negative to avoid auto-remove
			placement: 'top-right',
			type,
			theme: 'dark',
			onClick: () => {},
			onRemove: () => {}
			// component: BootstrapToast, // allows to override toast component/template per toast
		});

		//toast.remove()
	};

	if (form?.error) showToast({ title: 'Error', description: form.message, type: 'error' });

	if (form?.success) showToast({ title: 'Info', description: form.message, type: 'success' });

	const filterByCategory = (category: string) => async () => {
		if (category === FILTER_ALL_POSTS) {
			const { posts: allPost }: { posts: Post[] } = await hygraph.request(ALL_POSTS_QUERY);
			posts = allPost;
			categorySelected = category;
			return;
		}

		const { posts: postsByCategory }: { posts: Post[] } = await hygraph.request(
			POSTS_BY_CATEGORY_QUERY,
			{ category }
		);

		posts = postsByCategory;
		categorySelected = category;
	};

	const showMorePost = async () => {
		let countPage = pageSize * 10;
		const { posts: newListPosts, postsConnection }: { posts: Post[]; postsConnection: Connection } =
			await hygraph.request(ALL_POSTS_QUERY, {
				page: countPage
			});

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
							on:click={() => filterByCategory(name)}
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

<div class="flex justify-center items-center">
	{#if hasNextPage}
		<button
			class="bg-white text-zinc-800 rounded-full px-5 py-4 hover:text-white hover:bg-zinc-800 transition-all duration-300 ease-linear"
			on:click={showMorePost}
			>show me more
		</button>
	{/if}
</div>

<ToastContainer placement="bottom-right" let:data>
	<FlatToast {data} />
	<!-- Provider template for your toasts -->
</ToastContainer>
