export type Post = {
      id: number,
      title: string,
      free: boolean,
      link: string,
      description: string;
      image: string;
      categories: string[]
}

export type Category = {
	name: string,
	count: number,
}