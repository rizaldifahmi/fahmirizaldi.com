'use client';

import useDevices from '@/hooks/use-devices';
import useMediaQuery from '@/hooks/use-media-query';
import useNowPlaying from '@/hooks/use-now-playing';
import { max } from '@/lib/screen';

import NowPlayingBar from './now-playing-bar';
import NowPlayingCard from './now-playing-card';

const NowPlaying = () => {
  const isMaxMd = useMediaQuery(max('md'));
  const { track, isLoading: isNowPlayingLoading } = useNowPlaying();
  const { devices, isLoading: isDevicesLoading } = useDevices();

  console.log('NowPlaying Debug:', {
    isMaxMd,
    isNowPlayingLoading,
    isDevicesLoading,
    track,
  });

  if (isNowPlayingLoading || (!isMaxMd && isDevicesLoading)) {
    console.log('NowPlaying returning null due to loading');
    return null;
  }

  const onOpenSongUrl = (url?: string) =>
    url && window.open(url, '_blank', 'noopener,noreferrer');

  return isMaxMd ? (
    <NowPlayingCard track={track} onOpenSongUrl={onOpenSongUrl} devices={devices} />
  ) : (
    <NowPlayingBar
      track={track}
      onOpenSongUrl={onOpenSongUrl}
      devices={devices}
    />
  );
};

export default NowPlaying;
