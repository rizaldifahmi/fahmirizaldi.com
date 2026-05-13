import jwt from 'jsonwebtoken';
import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { env } from '@/lib/env';

export async function GET(request: NextRequest) {
  try {
    // 1. Check NextAuth session first
    const session = await auth();

    if (session && session.user) {
      return NextResponse.json(
        { 
          user: {
            id: session.id || (session.user as any).id,
            email: session.user.email,
            name: session.user.name,
            picture: session.user.image,
            email_verified: true,
          }
        },
        { status: 200 }
      );
    }

    // 2. Fallback to custom JWT token
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, env.NEXTAUTH_SECRET) as any;

    return NextResponse.json(
      { 
        user: {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          email_verified: decoded.email_verified,
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}
