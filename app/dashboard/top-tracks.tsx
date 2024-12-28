'use client';

import useSWR from 'swr';

import Card from '@/components/shared/card';
import Track from '@/components/track';
import useRequest from '@/hooks/use-request';
import type { APIErrorResponse, APISingleResponse } from '@/types/server';

interface TopTrack {
  artist: string;
  songUrl: string;
  title: string;
  albumImageUrl: string;
}

interface TopTracksData {
  tracks: TopTrack[];
}

const TopTracks = () => {
  const { data, isLoading } = useRequest<TopTracksData, APIErrorResponse>('/api/top-tracks');

  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold">Top Tracks</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Loading...
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!data?.tracks) {
    return null;
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">Top Tracks</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            My most played tracks on Spotify in the last 6 months
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {data.tracks.map((track, index) => (
            <Track key={track.songUrl} ranking={index + 1} {...track} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TopTracks; 