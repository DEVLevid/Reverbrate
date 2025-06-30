import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@phosphor-icons/react";
import { ActionDispatch, useEffect, useState } from "react";

import { formatMillisecondsToMMSS } from "@/lib/utils";
import ProgressBar from "../progressBar/ProgressBar";
import styles from "./styles.module.scss";

interface PlayerControlsProps {
  progress: number;
  dispatchFn: ActionDispatch<[action: { type: string; payload?: number }]>;
  duration: number;
  player: {
    previousTrack: () => void;
    nextTrack: () => void;
    togglePlay: () => void;
    seek?: (ms: number) => Promise<void>;
  };
  isPaused: boolean;
}

function PlayerControls({
  progress,
  dispatchFn,
  duration,
  player,
  isPaused,
}: PlayerControlsProps) {
  const [displayProgressMs, setDisplayProgressMs] = useState(progress);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (!isSeeking) {
      setDisplayProgressMs(progress);
    }
  }, [progress, isSeeking]);

  const handleProgressDragUpdate = (newProgressPercent: number) => {
    setIsSeeking(true);
    const newProgressMs = (newProgressPercent / 100) * duration;
    setDisplayProgressMs(newProgressMs);
  };

  const handleProgressSeek = (newProgressPercent: number) => {
    setIsSeeking(false);
    const newProgressMs = (newProgressPercent / 100) * duration;
    dispatchFn({ type: "SET_PROGRESS", payload: newProgressMs });
    if (player && typeof player.seek === "function") {
      player.seek(newProgressMs).catch((error: unknown) => {
        console.error("Erro ao buscar no Spotify:", error);
      });
    } else {
      console.warn(
        "Objeto do player do Spotify não disponível ou sem método seek."
      );
    }
  };

  return (
    <section className={styles.playerControlContainer}>
      <div className={styles.controlsWrapper}>
        <button
          className={styles.skipButton}
          onClick={() => player.previousTrack()}
        >
          <span className={styles.skipIcon}>
            <SkipBackIcon size={24} weight="fill" />
          </span>
        </button>
        <button
          className={styles.playButton}
          onClick={() => player.togglePlay()}
        >
          {isPaused ? (
            <span className={styles.playIcon}>
              <PlayIcon size={24} weight="fill" key="play-icon" />
            </span>
          ) : (
            <span className={styles.pauseIcon}>
              <PauseIcon size={24} weight="fill" key="pause-icon" />
            </span>
          )}
        </button>
        <button
          className={styles.skipButton}
          onClick={() => player.nextTrack()}
        >
          <span className={styles.skipIcon}>
            <SkipForwardIcon size={24} weight="fill" />
          </span>
        </button>
      </div>
      <div className={styles.musicBarContainer}>
        <span className={styles.musicMinutes}>
          {formatMillisecondsToMMSS(displayProgressMs)}{" "}
        </span>
        <ProgressBar
          progress={duration > 0 ? (displayProgressMs / duration) * 100 : 0}
          onSeek={handleProgressSeek}
          onDragUpdate={handleProgressDragUpdate}
        />
        <span className={styles.musicMinutes}>
          {formatMillisecondsToMMSS(duration)}
        </span>
      </div>
    </section>
  );
}

export default PlayerControls;
