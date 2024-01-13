// @ts-nocheck
import { getAllPost } from '$lib/fetching';

export const load = async () => {
	const { posts } = await getAllPost();
	let categoryList = [];

	posts.forEach(({ categories }) => {
		categories.forEach((category) => {
			if (!categoryList.includes(category)) categoryList = [...categoryList, category];
		});
	});

	return { categories: categoryList, posts };
};
