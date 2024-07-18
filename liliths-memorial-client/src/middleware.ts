import type { NextRequest } from 'next/server'
import { auth } from './auth';
 
export async function middleware(request: NextRequest) {
  const session = await auth();
 
  if (!session?.user && request.url.match('/edit')) {
    return Response.redirect(new URL('/', request.url))
  }
}
 