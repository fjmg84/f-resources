import { gql } from 'graphql-request';

export const GET_ALL_CATEGORIES = gql`
	query Category {
		categories {
			name
		}
	}
`;

export const GET_ALL_POSTS_QUERY = gql`
	query Post($page: Int, $category: String) {
		posts(where: { categories_some: { name_contains: $category } }, first: $page) {
			id
			title
			image
			categories {
				id
				name
			}
			link
			free
			description
		}
		postsConnection(where: { categories_some: { name_contains: $category } }, first: $page) {
			edges {
				node {
					id
				}
			}
			pageInfo {
				pageSize
				hasPreviousPage
				hasNextPage
			}
		}
	}
`;

export const SET_NEW_POST = gql`
	mutation Post(
		$title: String!
		$image: String!
		$link: String!
		$description: String!
		$user: String!
		$categories: [CategoryWhereUniqueInput!]
	) {
		createPost(
			data: {
				title: $title
				image: $image
				link: $link
				description: $description
				user: $user
				categories: { connect: $categories }
			}
		) {
			title
			link
			description
			user
			categories {
				id
			}
		}
	}
`;
