// @ts-nocheck
import { getAllPost } from '$lib/fetching';

export const load = async () => {
	const { posts } = await getAllPost();
	let categoryList = [];

	posts.forEach(({ categories }) => {
		categories.forEach((category) => {
			let index = categoryList.findIndex((item) => item.name === category);
			if (index < 0) {
				categoryList = [...categoryList, { name: category, count: 1 }];
			} else {
				categoryList[index].count++;
			}
		});
	});

	return { categories: categoryList, posts };
};
