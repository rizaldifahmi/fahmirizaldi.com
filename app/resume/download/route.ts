import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/share/resume.pdf',
    },
  });
} 