import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Obtiene el token de las cookies
  const token = request.cookies.get('token')?.value;
  
  // Redirige al login si no existe el token
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Verificación del token
  const decodedToken = jwt.decode(token) as jwt.JwtPayload & { user: { role: string } };

  // Verifica si el token está decodificado correctamente
  if (!decodedToken || !decodedToken.user) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  console.log('Token decodificado:', decodedToken);

  // Permitir acceso según el rol
  const { role } = decodedToken.user;

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isUserRoute = request.nextUrl.pathname.startsWith('/user');

  if ((role === 'admin' && isAdminRoute) || (role === 'user' && isUserRoute)) {
    return NextResponse.next(); // Permite acceso a la ruta correspondiente
  }

  // Redirige si el rol no coincide
  return NextResponse.redirect(new URL('/auth/login', request.url));
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'], // Rutas que deben estar protegidas
};
