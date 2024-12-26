import type { APIErrorResponse, APISingleResponse } from '@/types/server';

import useRequest from './use-request';

const useStats = <T>(stats: 'engagements' | 'wakatime' | 'github') => {
  const { data, isLoading } = useRequest<
    APISingleResponse<T>,
    APIErrorResponse
  >(`/api/dashboard/${stats}`, undefined, {
    revalidateOnFocus: true,
    refreshInterval: 60000, // Refresh every minute
    dedupingInterval: 30000,
  });

  const _stats = data?.data;

  return { data: _stats, isLoading };
};

export default useStats;
