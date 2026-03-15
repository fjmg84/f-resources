import { GraphQLClient } from 'graphql-request'
import { GET_ALL_CATEGORIES, GET_ALL_POSTS_QUERY } from './queries'
import type { Category, Connection, ListCategories, Post } from './types'

type SortableValue = string | number | boolean | undefined

export const getGraphqlUrl = () => {
  const url = process.env.GRAPHQL_URL ?? process.env.VITE_GRAPHQL_URL

  if (!url) {
    throw new Error('Missing GRAPHQL_URL. You can also keep using legacy VITE_GRAPHQL_URL.')
  }

  return url
}

const getHygraphClient = (token?: string) => {
  const headers: Record<string, string> = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  return new GraphQLClient(getGraphqlUrl(), { headers })
}

export const orderArray = <T extends object>({
  arr = [],
  field = undefined,
  type = '<',
}: {
  arr: T[]
  field?: keyof T
  type?: string
}) => {
  return arr.sort((a, b) => {
    const left = field ? ((a[field] as SortableValue) ?? '') : String(a)
    const right = field ? ((b[field] as SortableValue) ?? '') : String(b)

    if (left === right) return 0
    if (type === '>') return left > right ? -1 : 1
    return left < right ? -1 : 1
  })
}

interface PostResponse {
  posts: Post[]
  postsConnection: Connection
}

export const getAllPostQuery = async ({ page, category }: { page: number; category: string }) => {
  try {
    const hygraph = getHygraphClient()
    const response: PostResponse = await hygraph.request(GET_ALL_POSTS_QUERY, { page, category })
    return {
      posts: response.posts,
      infoPage: response.postsConnection.pageInfo,
    }
  } catch {
    return { error: true, message: 'Sorry an error occurred :(' }
  }
}

export const getAllCategoriesWithCounts = async (): Promise<{
  categories: Category[]
  counterPost: number
}> => {
  const hygraph = getHygraphClient()
  const data: ListCategories = await hygraph.request(GET_ALL_CATEGORIES)

  const categoriesArray: Category[] = data.categories.map((category) => {
    let count = 0
    data.posts.forEach((post) => {
      post.categories.forEach((p) => {
        if (p.id === category.id) count++
      })
    })
    return { name: category.name, count }
  })

  const withPosts = categoriesArray.filter((c) => c.count && c.count > 0)
  const ordered = orderArray({ arr: withPosts, field: 'count', type: '>' })

  return { categories: ordered, counterPost: data.posts.length }
}
