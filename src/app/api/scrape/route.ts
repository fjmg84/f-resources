import { NextRequest, NextResponse } from 'next/server'
import { extract } from '@extractus/article-extractor'
import { GraphQLClient } from 'graphql-request'
import { SET_NEW_POST } from '@/lib/queries'
import { auth } from '@/auth'
import { getGraphqlUrl } from '@/lib/services'

export async function POST(request: NextRequest) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: true, message: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { url, categories } = body

  if (!url) {
    return NextResponse.json({ error: true, message: 'URL is required' }, { status: 400 })
  }

  const page = await extract(url as string)

  if (!page) {
    return NextResponse.json(
      { error: true, message: 'Could not read page metadata. Try another URL.' },
      { status: 422 },
    )
  }

  const image = page.image || process.env.NOT_IMAGE || ''

  const hygraph = new GraphQLClient(getGraphqlUrl(), {
    headers: { Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}` },
  })

  try {
    await hygraph.request(SET_NEW_POST, {
      title: page.title,
      description: page.description,
      image,
      link: url,
      categories: (categories as string[]).map((name) => ({ name })),
      user: session.user.email,
    })

    return NextResponse.json({ success: true, message: 'Resource added successfully!' })
  } catch (error: unknown) {
    const gqlError = error as { response?: { errors?: { message: string }[] } }
    return NextResponse.json(
      { error: true, message: gqlError?.response?.errors?.[0]?.message ?? 'An error occurred' },
      { status: 500 },
    )
  }
}
