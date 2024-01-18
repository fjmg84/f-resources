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
