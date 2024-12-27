interface TrackProps {
  ranking: number;
  title: string;
  artist: string;
  songUrl: string;
  albumImageUrl: string;
}

const Track = ({ ranking, title, artist, songUrl, albumImageUrl }: TrackProps) => {
  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-lg border border-neutral-200 p-3 transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
    >
      <div className="flex items-baseline">
        <span className="font-mono text-sm font-bold text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
          {ranking}
        </span>
      </div>
      <div className="flex flex-1 items-center gap-4">
        <img
          src={albumImageUrl}
          alt={title}
          width={48}
          height={48}
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {title}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">{artist}</p>
        </div>
      </div>
    </a>
  );
};

export default Track; 