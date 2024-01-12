<script>
	// @ts-nocheck

	import { getPostsByCategory, getAllPost } from '$lib/fetching';

	export let data;
	console.log(data);
	let posts = data.posts;

	const FILTER_ALL_POSTS = 'all';

	const filterByCategory = async (category) => {
		console.log(category);
		if (category === FILTER_ALL_POSTS) {
			const response = await getAllPost();
			posts = response.posts;
			return;
		}
		const response = await getPostsByCategory({ category });
		posts = response.posts;
	};
</script>

<h1 class="text-5xl">Welcome to RESOURCES <span class="text-sm">(fjmg)</span></h1>

<ul class="flex gap-5 flex-wrap">
	<li>
		<button
			on:click={() => filterByCategory(FILTER_ALL_POSTS)}
			class="flex items-center justify-center bg-white text-black rounded-full h-10 w-auto p-5 text-nowrap"
		>
			all
		</button>
	</li>
	{#each data.categories as { name }}
		<li>
			<button
				on:click={() => filterByCategory(name)}
				class="flex items-center justify-center bg-white text-black rounded-full h-10 w-auto p-5 text-nowrap"
			>
				{name}
			</button>
		</li>
	{/each}
</ul>

<ul class="flex flex-wrap gap-5 items-center justify-center m-10">
	{#each posts as { categories, image, description, title, link }}
		<li
			class="p-5 flex flex-col gap-3 w-96 h-auto border-solid border-2 border-gray-700 rounded-lg"
		>
			<img src={image} alt={image} />
			<p class="text-md italic">{description}</p>
			<a
				target="_blank"
				href={link}
				class="text-zinc-800 bg-white p-2 rounded-md hover:bg-zinc-800 hover:text-white transition-all duration-300 ease-linear"
				>{title}</a
			>
			<ul class="flex flex-wrap gap-2">
				{#each categories as category}
					<li>
						<button
							on:click={() => filterByCategory(category)}
							class="flex items-center justify-center bg-zinc-800 text-white rounded-full h-8 px-4 text-sm text-nowrap"
						>
							{category}
						</button>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>
