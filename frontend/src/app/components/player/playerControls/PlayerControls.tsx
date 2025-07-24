"use client";
import { PlayerAction } from "@/app/hooks/useSpotifyPlayer";
import ProgressBar from "../progressBar/ProgressBar";
import styles from "./styles.module.scss";
import { SkipBack, SkipForward, Play, Pause } from "@phosphor-icons/react";

interface PlayerControlsProps {
  progress: number;
  duration: number;
  dispatchFn: React.Dispatch<PlayerAction>;
  player: any;
  isPaused: boolean;
}

function PlayerControls({
  progress,
  duration,
  dispatchFn,
  player,
  isPaused,
}: PlayerControlsProps) {
  const handleSeek = async (position: number) => {
    await player.seek(position);
    dispatchFn({ type: "SET_PROGRESS", payload: position });
  };

  return (
    <div className={styles.playerControlContainer}>
      <div className={styles.controlsWrapper}>
        <button
          className={styles.skipButton}
          onClick={() => player.previousTrack()}
        >
          <SkipBack size={20} weight="fill" />
        </button>
        <button
          className={styles.playButton}
          onClick={() => {
            player.togglePlay();
            dispatchFn({ type: "TOGGLE_PAUSE" });
          }}
        >
          {isPaused ? (
            <Play size={24} weight="fill" />
          ) : (
            <Pause size={24} weight="fill" />
          )}
        </button>
        <button
          className={styles.skipButton}
          onClick={() => player.nextTrack()}
        >
          <SkipForward size={20} weight="fill" />
        </button>
      </div>
      <div className={styles.musicBarContainer}>
        <ProgressBar
          progress={progress}
          duration={duration}
          onSeek={handleSeek}
        />
      </div>
    </div>
  );
}

export default PlayerControls;
