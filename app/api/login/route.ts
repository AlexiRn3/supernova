import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  // Remplace ceci par ton vrai mot de passe stocké en variable d'env idéalement
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  if (password === ADMIN_PASSWORD) {
    // Définition du cookie
    (await cookies()).set('supernova_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/', // Important pour que le middleware le voie partout
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}