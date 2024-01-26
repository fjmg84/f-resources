import { GraphQLClient } from 'graphql-request';
import { GET_ALL_CATEGORIES, GET_ALL_POSTS_QUERY } from './queries';
import type { Connection, Post } from './types';

const hygraph = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL);

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

interface PostResponse {
	posts: Post[];
	postsConnection: Connection;
}

export const getAllPostQuery = async ({ page, category }: { page: number; category: string }) => {
	try {
		const response: PostResponse = await hygraph.request(GET_ALL_POSTS_QUERY, {
			page,
			category
		});

		return {
			posts: response.posts.map((post) => post),
			infoPage: response.postsConnection.pageInfo
		};
	} catch (error) {
		return { error: true, message: 'Sorry an error occurred, :(!!' };
	}
};
export const getAllCategoriesQuery = async () => await hygraph.request(GET_ALL_CATEGORIES);
