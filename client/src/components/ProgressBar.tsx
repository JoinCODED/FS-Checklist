import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-2" data-testid="progress-container">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#14243F] dark:text-white" data-testid="text-percentage">
              {percentage}%
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              completed
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {current} of {total} tasks done
          </p>
        </div>
      </div>
      <Progress value={percentage} className="h-3" data-testid="progress-bar" />
    </div>
  );
}
