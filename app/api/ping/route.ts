import { NextResponse } from 'next/server';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import db from '@/lib/db';

export async function GET() {
  try {
    // Melakukan query sederhana ke database
    await db.contentMeta.findFirst({
      select: { id: true },
      take: 1
    });

    const now = new Date();
    const jakartaTime = toZonedTime(now, 'Asia/Jakarta');
    const formattedTime = format(jakartaTime, 'dd-MM-yyyy HH:mm:ss');

    return NextResponse.json(
      { 
        status: 'success',
        message: 'Ping successful',
        timestamp: formattedTime
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
    const now = new Date();
    const jakartaTime = toZonedTime(now, 'Asia/Jakarta');
    const formattedTime = format(jakartaTime, 'dd-MM-yyyy HH:mm:ss');

    return NextResponse.json(
      { 
        status: 'error',
        message: 'Service unavailable',
        timestamp: formattedTime
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