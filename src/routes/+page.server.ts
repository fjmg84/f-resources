import { extract } from '@extractus/article-extractor';
import { GET_ALL_CATEGORIES, GET_ALL_POSTS_QUERY, SET_NEW_POST } from '$lib/queries';
import { NOT_IMAGE, HYGRAPH_MUTATION_TOKEN } from '$env/static/private';
import type { Category, Connection, ListCategories, Post } from '$lib/types';
import { countCategories, orderArray } from '$lib/services';
import { GraphQLClient } from 'graphql-request';

const hygraph = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
	headers: {
		Authorization: `Bearer ${HYGRAPH_MUTATION_TOKEN}`
	}
});

export const load = async (event): Promise<any> => {
	const categories: ListCategories = await hygraph.request(GET_ALL_CATEGORIES);

	let categoriesArray: Category[] = [];
	categories.categories.forEach((category) => {
		let count = 0;
		categories.posts.forEach((post) => {
			post.categories.forEach((p) => {
				if (p.id === category.id) count++;
			});
		});

		categoriesArray = [...categoriesArray, { name: category.name, count }];
	});

	const { posts, postsConnection }: { posts: Post[]; postsConnection: Connection } =
		await hygraph.request(GET_ALL_POSTS_QUERY, {
			page: 10,
			category: ''
		});

	const categoriesMayorZero = categoriesArray.filter((c) => c.count && c.count > 0);
	const categoriesOrder = orderArray({
		arr: categoriesMayorZero,
		field: 'count',
		type: '>'
	});

	return {
		categories: categoriesOrder,
		counterPost: categories.posts.length,
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

			if (page === null)
				return { error: true, message: 'Sorry, could not read page meta data. :(!!' };

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
