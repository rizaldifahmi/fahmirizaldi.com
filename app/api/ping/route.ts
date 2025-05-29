import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Melakukan query sederhana ke database
    await db.$queryRaw`SELECT 1`;

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="2;url=/" />
        </head>
        <body>
          <p>Database ping successful. Redirecting to home page...</p>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="2;url=/" />
        </head>
        <body>
          <p>Database ping failed. Redirecting to home page...</p>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
        status: 500
      }
    );
  }
} 