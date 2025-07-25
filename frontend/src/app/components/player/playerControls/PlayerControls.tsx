"use client";
import { PlayerAction } from "@/app/hooks/useSpotifyPlayer";
import ProgressBar from "../progressBar/ProgressBar";
import styles from "./styles.module.scss";
import { SkipBack, SkipForward, Play, Pause } from "@phosphor-icons/react";
import BaseReview from "../../review/review";
import { TrackWithReview } from "@/types/search";
import { usePlayer } from "@/app/contexts/PlayerContext";

interface PlayerControlsProps {
  progress: number;
  duration: number;
  dispatchFn: React.Dispatch<PlayerAction>;
  player: any;
  isPaused: boolean;
  track: TrackWithReview;
}

function PlayerControls({
  progress,
  duration,
  dispatchFn,
  player,
  isPaused,
  track,
}: PlayerControlsProps) {
  const { nextTrack, previousTrack } = usePlayer();

  const handleSeek = async (position: number) => {
    await player.seek(position);
    dispatchFn({ type: "SET_PROGRESS", payload: position });
  };

  const handleNextTrack = async () => {
    await player.nextTrack();
    await nextTrack();
  };

  const handlePreviousTrack = async () => {
    await player.previousTrack();
    await previousTrack();
  };

  return (
    <div className={styles.playerControlContainer}>
      <div className={styles.controlsWrapper}>
        <button className={styles.skipButton} onClick={handlePreviousTrack}>
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
        <button className={styles.skipButton} onClick={handleNextTrack}>
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
      <div className={styles.reviewContainer}>
        <BaseReview track={track} />
      </div>
    </div>
  );
}

export default PlayerControls;
