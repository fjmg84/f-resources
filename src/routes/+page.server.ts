import { getAllPost } from '$lib/fetching';
import { countCategories } from '$lib/services';

export const load = async () => {
	const { posts, meta } = await getAllPost({ page: 1 });

	const categories = countCategories({ posts });

	return { categories, posts, meta };
};
