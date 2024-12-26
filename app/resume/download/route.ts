import { type NextRequest } from 'next/server';

export async function GET() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/share/resume.pdf',
    },
  });
} 