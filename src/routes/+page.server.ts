import { ALL_POSTS_QUERY } from '$lib/queries';
import { countCategories } from '$lib/services';
import type { Connection, Post } from '$lib/types';
import { GraphQLClient } from 'graphql-request';

export const load = async (event): Promise<any> => {
	const hygraph = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
		headers: {}
	});

	/* const session = await event.locals.getSession();
	console.log(session); */

	const { posts, postsConnection }: { posts: Post[]; postsConnection: Connection } =
		await hygraph.request(ALL_POSTS_QUERY, {
			page: 10
		});

	return {
		categories: countCategories({ posts }),
		posts,
		meta: postsConnection.pageInfo
	};
};
