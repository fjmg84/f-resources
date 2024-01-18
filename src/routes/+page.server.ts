import { getAllPost } from '$lib/fetching';
import { countCategories } from '$lib/services';
import type { Meta, Post } from '$lib/types';




export const load = async (): Promise<any> => {
	const response: string | { posts: Post[]; meta: Meta; } = await getAllPost({ page: 1 });

	if(typeof response === 'string') return { error: response }


	const { posts, meta } = response;
	const categories = countCategories({ posts });

	return { categories, posts, meta };
};
