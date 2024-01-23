<script lang="ts">
	import type { Category } from '$lib/types';

	export let categories: Category[];
	let selectedCategories: Category[] = [];

	const selectCategory = (event: any) => {
		const category = event.target.value;

		if (Number(category) === -1) return;

		let indexCategory = selectedCategories.findIndex((c) => c.name === category);
		if (indexCategory !== -1) return;

		if (category) selectedCategories = [...selectedCategories, { name: category }];
	};

	const removeCategory = (category: string) => () => {
		selectedCategories = selectedCategories.filter((c) => c.name !== category);
	};
</script>

<div class="flex flex-wrap border-b-2 border-b-zinc-700 max-w-[500px]">
	{#each selectedCategories as { name }}
		<div
			class="relative flex items-center m-2 rounded-full py-2 px-3 bg-gray-400 text-black text-sm"
		>
			<p class="px-5 pl-2 pr-8">{name}</p>
			<button
				on:click={removeCategory(name)}
				class="absolute right-2 w-[20px] h-[20px] bg-gray-600 rounded-full flex items-center justify-center"
			>
				<img src="/close.svg" alt="close" class="w-[12px]" />
			</button>
		</div>
	{/each}
</div>

<form method="post" class="flex flex-wrap gap-5">
	<select on:change={selectCategory} class="text-zinc-900 p-2 w-full max-w-[500px]">
		<option value={-1}>Select category</option>
		{#each categories as { name }}
			<option value={name} class="m-6">{name}</option>
		{/each}
	</select>

	{#each selectedCategories as { name }}
		<input type="hidden" name="categories" value={name} />
	{/each}

	<div
		class="bg-white flex flex-col md:flex-row justify-between rounded-full md:overflow-hidden w-full max-w-[500px]"
	>
		<input type="url" name="url" class="text-zinc-900 p-2 pl-5 w-full md:rounded-l-full" />
		<button type="submit" class="bg-slate-200 text-zinc-900 px-5 py-2 text-nowrap"
			>Add site to bookmark</button
		>
	</div>
</form>
