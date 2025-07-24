import React from "react";
import styles from "./styles.module.scss";
import { TrackWithReview } from "@/types/search";
import BaseReview from "@/app/components/review/review";

export default function BestResult({
  track,
}: {
  track: TrackWithReview | null;
}) {
  if (!track) return null;
  return (
    <div className={styles.bestResult}>
      <div className={styles.bestCoverContainer}>
        {track.cover ? (
          <img src={track.cover} alt={track.name} className={styles.bestCover} />
        ) : (
          <div className={styles.placeholderCover}>
            <span>🎵</span>
          </div>
        )}
      </div>
      <div className={styles.bestInfo}>
        <div className={styles.trackInfoContainer}>
          <div className={styles.trackInfo}>
            <div className={styles.bestName}>{track.name}</div>
            <div className={styles.bestArtist}>{track.artist_name}</div>
          </div>
          <div className={styles.satarContainer}>
            <BaseReview track={track} />
          </div>
      
        </div>
        {track.review && (
          <>
            <div className={styles.bestComment}>
              <i>&quot;{track.review.comment}&quot;</i>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
