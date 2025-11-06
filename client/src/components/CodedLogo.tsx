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
        {/* Left bracket [ */}
        <path
          d="M13 8 L8 8 L8 32 L13 32"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right bracket ] */}
        <path
          d="M27 8 L32 8 L32 32 L27 32"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Letter C - arc shape with opening on right */}
        <path
          d="M25 15 A7 7 0 0 0 13 20 A7 7 0 0 0 25 25"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-foreground">CODED</span>
      </span>
    </div>
  );
}
