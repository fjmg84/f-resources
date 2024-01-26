import { extract } from '@extractus/article-extractor';
import { GET_ALL_POSTS_QUERY, SET_NEW_POST } from '$lib/queries';
import { NOT_IMAGE, HYGRAPH_MUTATION_TOKEN } from '$env/static/private';
import type { Connection, Post } from '$lib/types';
import { countCategories } from '$lib/services';
import { GraphQLClient } from 'graphql-request';

const hygraph = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
	headers: {
		Authorization: `Bearer ${HYGRAPH_MUTATION_TOKEN}`
	}
});

export const load = async (event): Promise<any> => {
	const { posts, postsConnection }: { posts: Post[]; postsConnection: Connection } =
		await hygraph.request(GET_ALL_POSTS_QUERY, {
			page: 10,
			category: ""
		});

	return {
		categories: countCategories({ posts }),
		posts,
		meta: postsConnection.pageInfo
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.getSession();
		const data = await request.formData();
		const url = data.get('url');
		const categories = data.getAll('categories');

		if (url !== null) {
			const page = await extract(url as string);

			if (page === null) return { error: 'Page not found' };

			const image = page?.image === '' ? NOT_IMAGE : page?.image;

			const post = {
				title: page?.title,
				description: page?.description,
				image,
				link: url,
				categories: categories.map((category) => {
					return { name: category };
				}),
				user: user?.email
			};

			try {
				await hygraph.request(SET_NEW_POST, post);

				return {
					success: true,
					message: 'Post created successfully.'
				};
			} catch (
				error: any // TODO: review this type
			) {
				console.log(error);

				return {
					error: true,
					message: error.response.errors[0].message
				};
			}
		}
	}
};
