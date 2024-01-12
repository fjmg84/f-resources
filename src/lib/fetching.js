// @ts-nocheck
const URL_API = 'http://localhost:1337/api';

const getData = async ({ path = '', method = 'GET' }) => {
	try {
		let response = await fetch(`${URL_API}${path}`, {
			method
		});

		let data = await response.json();
		return data;
	} catch (error) {
		return error;
	}
};

export const getCategories = async () => {
	const { data } = await getData({ path: '/categories' });

	const categories = data.map(({ id, attributes }) => ({
		id,
		name: attributes.name
	}));
	return { categories };
};

export const getAllPost = async () => {
	const { data, meta } = await getData({ path: '/posts?populate=*' });

	return {
		posts: data.map(({ id, attributes }) => {
			const { title, free, link, description, image, categories } = attributes;

			return {
				id,
				title,
				free,
				link,
				description,
				image: image.data.attributes.formats.medium.url || null,
				categories: categories.data.map(({ attributes }) => attributes.name)
			};
		}),
		meta
	};
};

export const getPostsByCategory = async ({ category }) => {
	const { data, meta } = await getData({
		path: `/posts?filters[categories][name][$eq]=${category}&populate=*`
	});

	return {
		posts: data.map(({ id, attributes }) => {
			const { title, free, link, description, image, categories } = attributes;
			return {
				id,
				title,
				free,
				link,
				description,
				image: image.data.attributes.formats.medium.url || null,
				categories: categories.data.map(({ attributes }) => attributes.name)
			};
		}),
		meta
	};
};
