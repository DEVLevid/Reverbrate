import styles from "./styles.module.scss";

interface ProgressBarProps {
  progress: number;
  onSeek: (progress: number) => void;
  onDragUpdate?: (progress: number) => void;
}

import { useCallback, useEffect, useRef, useState } from "react";

const ProgressBar = ({ progress, onSeek, onDragUpdate }: ProgressBarProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  const progressBarRef = useRef<HTMLDivElement>(null);

  const displayProgress = isDragging ? dragProgress : progress;

  const calculateProgress = useCallback((clientX: number) => {
    if (progressBarRef.current) {
      const bar = progressBarRef.current;
      const { left, width } = bar.getBoundingClientRect();
      let newProgress = ((clientX - left) / width) * 100;
      newProgress = Math.max(0, Math.min(100, newProgress));
      return newProgress;
    }
    return 0;
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const newProgress = calculateProgress(e.clientX);
    setDragProgress(newProgress);
    if (onDragUpdate) {
      onDragUpdate(newProgress);
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newProgress = calculateProgress(e.clientX);
        setDragProgress(newProgress);
        if (onDragUpdate) {
          onDragUpdate(newProgress);
        }
      }
    },
    [isDragging, calculateProgress, onDragUpdate]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (onSeek) {
      onSeek(dragProgress);
    }
  }, [dragProgress, onSeek]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={progressBarRef}
      className={styles.progressBarContainer}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => handleMouseDown(e.touches[0] as any)}
      onTouchMove={(e) => handleMouseMove(e.touches[0] as any)}
      onTouchEnd={handleMouseUp}
    >
      <div
        className={styles.progressBarFill}
        style={{ width: `${displayProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
