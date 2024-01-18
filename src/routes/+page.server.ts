import { ALL_POSTS_QUERY } from '$lib/queries';
import { countCategories } from '$lib/services';
import type { Post } from '$lib/types';
import { GraphQLClient } from 'graphql-request';

export const load = async (): Promise<any> => {
	const hygraph = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
		headers: {}
	});

	const { posts }: { posts: Post[] } = await hygraph.request(ALL_POSTS_QUERY);

	return {
		categories: countCategories({ posts }),
		posts
	};

	/* const response: string | { posts: Post[]; meta: Meta; } = await getAllPost({ page: 1 });

	if(typeof response === 'string') return { error: response }


	const { posts, meta } = response;
	const categories = countCategories({ posts });

	return { categories, posts, meta }; */
};
