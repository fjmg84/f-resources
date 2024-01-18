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
