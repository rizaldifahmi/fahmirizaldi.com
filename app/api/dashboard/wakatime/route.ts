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

export const GET = async () => {
  try {
    const lastSevenDaysStats = await getLastSevenDaysStats();
    const allTimeSinceToday = await getAllTimeSinceToday();

    return response<APISingleResponse<CodingActivityStats>>(
      {
        data: {
          ...lastSevenDaysStats,
          all_time_since_today: allTimeSinceToday,
        },
      },
      200,
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      },
    );
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
