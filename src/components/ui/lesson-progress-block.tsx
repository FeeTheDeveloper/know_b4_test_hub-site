import { cn } from "@/lib/utils";

interface LessonProgressBlockProps {
  title: string;
  moduleName: string;
  duration: string;
  completed: boolean;
  current?: boolean;
}

export function LessonProgressBlock({
  title,
  moduleName,
  duration,
  completed,
  current,
}: LessonProgressBlockProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-3 rounded-lg border transition-colors",
        completed && "bg-green-50 border-green-200",
        current && !completed && "bg-brandGold/5 border-brandGold/30",
        !completed && !current && "bg-white border-gray-200"
      )}
    >
      {/* Status indicator */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          completed && "bg-success text-white",
          current && !completed && "bg-brandGold text-brandBlue",
          !completed && !current && "bg-gray-200 text-gray-400"
        )}
      >
        {completed ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500">{moduleName}</p>
      </div>

      <span className="text-xs text-gray-400 shrink-0">{duration}</span>
    </div>
  );
}
