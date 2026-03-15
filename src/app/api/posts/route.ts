import { NextRequest, NextResponse } from 'next/server'
import { getAllPostQuery } from '@/lib/services'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') ?? ''
  const page = parseInt(searchParams.get('page') ?? '10', 10)

  const result = await getAllPostQuery({ page, category })

  if ('error' in result) {
    return NextResponse.json(result, { status: 500 })
  }

  return NextResponse.json(result)
}
