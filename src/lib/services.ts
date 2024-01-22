import type { Post } from './types';

export const countCategories = ({ posts = [] }: { posts: Post[] }) => {
	let categoryList: any[] = [];

	posts.forEach(({ categories }) => {
		categories.forEach(({ name: category }) => {
			let index = categoryList.findIndex((item) => item.name === category);
			if (index < 0) {
				categoryList = [...categoryList, { name: category, count: 1 }];
			} else {
				categoryList[index].count++;
			}
		});
	});

	return categoryList;
};
