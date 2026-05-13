import { cn } from '@/lib/utils';

const Progress = ({
  data,
  className,
  items,
}: {
  data: { name: string; percent?: number; total_seconds: number };
  className?: string;
  items?: Array<{ total_seconds: number }>;
}) => {
  const { name, total_seconds } = data;

  const totalSeconds = items?.reduce((acc, curr) => acc + curr.total_seconds, 0) || 0;
  const percent = totalSeconds > 0 ? (total_seconds / totalSeconds) * 100 : 0;
  const formattedPercent = percent < 1 ? percent.toFixed(1) : percent.toFixed(0);

  return (
    <div className={cn('flex items-center justify-between gap-3')}>
      <div className={cn('w-24')}>{name}</div>
      <div
        className={cn(
          'h-3 flex-1 overflow-hidden rounded-full bg-muted',
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Number(formattedPercent)}
      >
        <div
          className={cn('h-full rounded-full', className)}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className={cn('w-8 text-right')}>{formattedPercent}%</div>
    </div>
  );
};

export default Progress;
