import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn, trim } from '@/lib/utils';
import type { NowPlaying } from '@/types/spotify';

import AnimatedBars from '../animated-bars';
import { Spotify } from '../icons';
import RenderIf from '../render-if';

const NowPlayingCard = ({
  track,
  onOpenSongUrl,
  isExpanded = false,
}: {
  track?: NowPlaying;
  onOpenSongUrl?: (url?: string) => void;
  isExpanded?: boolean;
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <div className={cn('-mx-4')}>
      <div
        className={cn(
          'flex items-center justify-between bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-1',
        )}
      >
        {track?.songUrl ? (
          <>
            <div className={cn('flex items-center gap-2')}>
              <AnimatedBars />
              <span className={cn('text-sm text-white')}>Now playing: </span>
              <div
                className={cn(
                  'flex items-center gap-2 transition-all duration-200',
                )}
              >
                <RenderIf isTrue={Boolean(track.albumImageUrl)}>
                  <Image
                    src={track.albumImageUrl as string}
                    alt={track.album as string}
                    className={cn('rounded-sm')}
                    width={16}
                    height={16}
                    unoptimized
                  />
                </RenderIf>
                <div
                  className={cn(
                    'flex gap-1 text-sm text-white',
                    'hover:cursor-pointer hover:underline',
                  )}
                  onClick={() => onOpenSongUrl?.(track.songUrl)}
                >
                  <div className={cn('inline-flex')}>
                    <span>{track.artist}</span> - <span>{track.title}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={cn('flex items-center gap-2')}>
            <Spotify className={cn('size-4 fill-spotify')} />
            <span className={cn('text-sm text-white')}>Not Playing</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NowPlayingCard;
