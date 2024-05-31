export interface Category {
	name: string;
	count?: number;
}

export interface Post {
	title: string;
	image: string;
	categories: Category[];
	link: string;
	free: boolean;
	description: string;
}

export interface Node {
	node: { id: string };
}

export interface Connection {
	edges: Node[];
	pageInfo: { pageSize: number; hasPreviousPage: boolean; hasNextPage: boolean };
}

export interface ListCategories {
	categories: {
		id: string;
		name: string;
	}[];
	posts: {
		id: string;
		categories: {
			id: string;
			name: string;
		}[];
	}[];
}
