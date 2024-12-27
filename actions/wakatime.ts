'use server';

import { env } from '@/lib/env';
import fetcher from '@/lib/fetcher';
import type {
  WakaTimeAllTimeSinceToday,
  WakaTimeResponse,
  WakaTimeStats,
} from '@/types/wakatime';

const ALL_TIME_SINCE_TODAY_ENDPOINT =
  'https://wakatime.com/api/v1/users/current/all_time_since_today';
const STATS_ENDPOINT = 'https://wakatime.com/api/v1/users/current/stats';

const EXCLUDED_LANGUAGES = [
  'Image (svg)',
  'MDX',
  'Java Properties',
  'Markdown',
  'SVG',
  'Properties',
  'Text',
  'Git Config',
  'YAML',
  'JSON',
  'Git',
  'Bash',
];

const generateBasicAuthorizationBase64 = (): string => {
  const apiKey = env.WAKATIME_API_KEY;
  if (!apiKey) {
    throw new Error('WAKATIME_API_KEY is not configured');
  }
  return `Basic ${Buffer.from(apiKey).toString('base64')}`;
};

const fetchWithRetry = async <T>(
  url: string,
  options: RequestInit,
  retries = 3
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Accept': 'application/json',
        'User-Agent': 'fahmirizaldi.com/4.0.0',
        'Origin': 'https://fahmirizaldi.com',
      },
      next: {
        revalidate: 0
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.log(`[WakaTime] Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const getAllTimeSinceToday =
  async (): Promise<WakaTimeAllTimeSinceToday> => {
    try {
      console.log('[WakaTime] Fetching all time stats...');
      const auth = generateBasicAuthorizationBase64();
      console.log('[WakaTime] Authorization header generated');

      const response = await fetchWithRetry<WakaTimeResponse<WakaTimeAllTimeSinceToday>>(
        ALL_TIME_SINCE_TODAY_ENDPOINT,
        {
          method: 'GET',
          headers: {
            Authorization: auth,
          },
        }
      );

      if (!response?.data) {
        console.error('[WakaTime] No data in response:', response);
        throw new Error('No data received from WakaTime API');
      }

      console.log('[WakaTime] All time stats received');
      return response.data;
    } catch (error) {
      console.error('[WakaTime] All time stats error:', error);
      throw error;
    }
  };

export const getLastSevenDaysStats = async (): Promise<WakaTimeStats> => {
  try {
    console.log('[WakaTime] Fetching last 7 days stats...');
    const auth = generateBasicAuthorizationBase64();
    console.log('[WakaTime] Authorization header generated');

    const response = await fetchWithRetry<WakaTimeResponse<WakaTimeStats>>(
      `${STATS_ENDPOINT}/last_7_days`,
      {
        method: 'GET',
        headers: {
          Authorization: auth,
        },
      }
    );

    if (!response?.data) {
      console.error('[WakaTime] No data in response:', response);
      throw new Error('No data received from WakaTime API');
    }

    console.log('[WakaTime] Last 7 days stats received');
    const data = response.data;
    
    // Keep original data for totals and averages
    const {
      human_readable_daily_average_including_other_language,
      human_readable_total_including_other_language,
      total_seconds_including_other_language,
      daily_average_including_other_language,
      ...filteredData
    } = data;
    
    const result = {
      ...filteredData,
      human_readable_daily_average_including_other_language,
      human_readable_total_including_other_language,
      total_seconds_including_other_language,
      daily_average_including_other_language,
      languages: data.languages?.filter(
        (lang) => !EXCLUDED_LANGUAGES.includes(lang.name)
      ),
    };

    console.log('[WakaTime] Processed stats');
    return result;
  } catch (error) {
    console.error('[WakaTime] Last 7 days stats error:', error);
    throw error;
  }
};
