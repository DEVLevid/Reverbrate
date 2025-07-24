import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { formatMillisecondsToMMSS } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  duration: number;
  onSeek: (position: number) => void;
}

function ProgressBar({ progress, duration, onSeek }: ProgressBarProps) {
  const [displayProgress, setDisplayProgress] = useState(progress);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (!isSeeking) {
      setDisplayProgress(progress);
    }
  }, [progress, isSeeking]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDisplayProgress(value);
    setIsSeeking(true);
  };

  const handleSeek = () => {
    setIsSeeking(false);
    onSeek(displayProgress);
  };

  const progressPercent = (displayProgress / duration) * 100;

  return (
    <div className={styles.progressBarContainer}>
      <span className={styles.time}>
        {formatMillisecondsToMMSS(displayProgress)}
      </span>
      <input
        type="range"
        min={0}
        max={duration}
        value={displayProgress}
        onChange={handleProgressChange}
        onMouseUp={handleSeek}
        onTouchEnd={handleSeek}
        className={styles.progressBar}
        style={
          { "--progress-percent": `${progressPercent}%` } as React.CSSProperties
        }
      />
      <span className={styles.time}>{formatMillisecondsToMMSS(duration)}</span>
    </div>
  );
}

export default ProgressBar;
