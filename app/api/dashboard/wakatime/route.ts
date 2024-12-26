import { headers } from 'next/headers';

import {
  getAllTimeSinceToday,
  getLastSevenDaysStats,
} from '@/actions/wakatime';
import { response } from '@/lib/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';
import type { CodingActivityStats } from '@/types/stats';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const runtime = 'nodejs';

export const GET = async () => {
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const cfIpCountry = headersList.get('cf-ipcountry') || '';
    
    console.log('[WakaTime API] Request from:', cfIpCountry, 'User-Agent:', userAgent);

    const lastSevenDaysStats = await getLastSevenDaysStats();
    const allTimeSinceToday = await getAllTimeSinceToday();

    const res = new Response(
      JSON.stringify({
        data: {
          ...lastSevenDaysStats,
          all_time_since_today: allTimeSinceToday,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0',
          'Access-Control-Allow-Origin': 'https://fahmirizaldi.com',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );

    return res;
  } catch (error) {
    console.error('[WakaTime API] Error:', error);
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
