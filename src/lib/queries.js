import { gql } from 'graphql-request';

export const ALL_CATEGORIES = gql`
	query Category {
		categories {
			name
		}
	}
`;

export const ALL_POSTS_QUERY = gql`
	query {
		posts {
			title
			image
			categories {
				name
			}
			link
			free
			description
		}
	}
`;

export const POSTS_BY_CATEGORY_QUERY = gql`
	query Post($category: String) {
		posts(where: { categories_some: { name: $category } }) {
			id
			title
			link
			image
			categories {
				name
			}
		}
	}
`;
