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
        <rect 
          width="40" 
          height="40" 
          rx="8" 
          fill="#14243F"
          className="dark:fill-white"
        />
        <path
          d="M14 10 L10 10 L10 30 L14 30"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dark:stroke-[#14243F]"
        />
        <path
          d="M26 10 L30 10 L30 30 L26 30"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dark:stroke-[#14243F]"
        />
        <text
          x="20"
          y="26"
          fill="white"
          fontSize="20"
          fontWeight="600"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          className="dark:fill-[#14243F]"
        >
          C
        </text>
      </svg>
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-foreground">CODED</span>
      </span>
    </div>
  );
}
