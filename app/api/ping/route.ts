import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Melakukan query sederhana ke database
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json({ 
      status: 'success',
      message: 'Ping successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Service unavailable',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
} 