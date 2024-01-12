import { getAllPost, getCategories } from '$lib/fetching';

export const load = async () => {
	return { categories: (await getCategories()).categories, posts: (await getAllPost()).posts };
};
