export function CodedLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="40" height="40" rx="8" className="fill-[#14243F] dark:fill-white" />
        <path
          d="M15 12L10 20L15 28"
          className="stroke-white dark:stroke-[#14243F]"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 12L30 20L25 28"
          className="stroke-white dark:stroke-[#14243F]"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="22"
          y1="10"
          x2="18"
          y2="30"
          className="stroke-white dark:stroke-[#14243F]"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-foreground">CODED</span>
      </span>
    </div>
  );
}
