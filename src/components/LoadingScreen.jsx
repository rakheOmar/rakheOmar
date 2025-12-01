import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onLoadComplete();
        }, 800);
      }, 200);
    }
  }, [progress, onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExiting ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
      }`}
    >
      <div className="flex w-64 flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium tracking-tight text-foreground">Portfolio</span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">{progress}%</span>
        </div>

        <div className="h-0.5 w-full overflow-hidden bg-muted">
          <div
            className="h-full bg-foreground transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
