import type { Meta, Post, RootObject } from '$lib/types';
const URL_API = 'https://f-resources-api.onrender.com/api';


const getData = async ({ path = '', method = 'GET' }): Promise<RootObject | unknown> => {
	try {
		let response = await fetch(`${URL_API}${path}`, {
			method
		});
		
		if(response.statusText !== 'OK' && response.ok !== true)  throw new Error('Something bad happened');

		let data = await response.json();
		return data;
	} catch (error) {
		if(error instanceof Error) return error;
		
		return { message: 'Something bad happened', status: 500};

	}
};


export const getAllPost = async ({ page }: {page: number}) => {
	const response = await getData({ path: `/posts?populate=*&pagination[page]=${page}` });
	
	if(response instanceof Error) return response.message
	
	const {data, meta} = response as RootObject
	const posts: Post[] = data.map(({ id, attributes }) => {
			const { title, free, link, description, image, categories } = attributes;

			return {
				id,
				title,
				free,
				link,
				description,
				image: image.data.attributes.formats.medium.url,
				categories: categories.data.map(({ attributes }) => attributes.name)
			};
		})

	return {
		posts,
		meta
	};
};

export const getPostsByCategory = async ({ category }: {category: string})  => {
	
	console.log(category)
	
	const response = await getData({
		path: `/posts?filters[categories][name][$eq]=${category}&populate=*`
	});

	if(response instanceof Error) return response.message

	const { data, meta } = response as RootObject

	return {
		posts: data.map(({ id, attributes }) => {
			const { title, free, link, description, image, categories } = attributes;
			return {
				id,
				title,
				free,
				link,
				description,
				image: image.data.attributes.formats.medium.url,
				categories: categories.data.map(({ attributes }) => attributes.name)
			};
		}),
		meta
	};
};
