import type { APIErrorResponse, APISingleResponse } from '@/types/server';

import useRequest from './use-request';

const useStats = <T>(
  stats: 'engagements' | 'wakatime' | 'github',
  params?: Record<string, string>
) => {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  const { data, isLoading } = useRequest<APISingleResponse<T>, APIErrorResponse>(
    `/api/dashboard/${stats}${queryString}`,
    undefined,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000, // Refresh every 30 seconds
      dedupingInterval: 15000, // Allow new requests after 15 seconds
    }
  );

  const _stats = data?.data;

  return { data: _stats, isLoading };
};

export default useStats;
