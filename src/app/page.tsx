import { auth } from '@/auth'
import { getAllCategoriesWithCounts, getAllPostQuery } from '@/lib/services'
import ResourcesClient from '@/components/ResourcesClient'

export default async function HomePage() {
  const [session, categoriesData, postsData] = await Promise.all([
    auth(),
    getAllCategoriesWithCounts(),
    getAllPostQuery({ page: 10, category: '' }),
  ])

  const { categories, counterPost } = categoriesData
  const initialPosts = 'error' in postsData ? [] : postsData.posts
  const initialHasNextPage = 'error' in postsData ? false : (postsData.infoPage?.hasNextPage ?? false)

  return (
    <ResourcesClient
      initialPosts={initialPosts}
      categories={categories}
      counterPost={counterPost}
      initialHasNextPage={initialHasNextPage}
      initialPageSize={10}
      isLoggedIn={!!session?.user}
    />
  )
}
