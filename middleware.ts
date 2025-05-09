import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabase } from './lib/supbase'

const PUBLIC_PATHS = ['/login', '/auth/callback']

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const { data: { session } } = await supabase.auth.getSession()

  // 检查是否是公开路径
  const isPublicPath = PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path))

  // 如果用户未登录且访问的不是公开路径，重定向到登录页
  if (!session && !isPublicPath) {
    const redirectUrl = new URL('/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // 如果用户已登录且访问登录页，重定向到首页
  if (session && isPublicPath) {
    const redirectUrl = new URL('/', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
} 