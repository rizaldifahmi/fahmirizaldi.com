import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Melakukan query sederhana ke database
    await db.contentMeta.findFirst({
      select: { id: true },
      take: 1
    });

    return NextResponse.json(
      { 
        status: 'success',
        message: 'Ping successful',
        timestamp: new Date().toISOString()
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Service unavailable',
        timestamp: new Date().toISOString()
      },
      { 
        status: 503,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
} 