import { GraphQLClient } from 'graphql-request';
import { ALL_POSTS_QUERY, POSTS_BY_CATEGORY_QUERY } from './queries';

const hygraph = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
	headers: {}
});

export const allPostQuery = async () => await hygraph.request(ALL_POSTS_QUERY);

export const getPostByCategoryQuery = async (/** @type {string} */ category) =>
	await hygraph.request(POSTS_BY_CATEGORY_QUERY, { category });

export const paginationPostQuery = async (/** @type {number} */ page) =>
	await hygraph.request(ALL_POSTS_QUERY, {
		page
	});
