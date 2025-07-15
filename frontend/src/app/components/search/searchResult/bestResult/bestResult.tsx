import React from "react";
import styles from "./styles.module.scss";
import { TrackWithReview } from "@/types/search";
import { StarSelector } from "@/app/components/base/starSelector/starSelector";

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
        ) : null}
      </div>
      <div className={styles.bestInfo}>
        <div className={styles.trackInfoContainer}>
          <div className={styles.trackInfo}>
            <div className={styles.bestName}>{track.name}</div>
            <div className={styles.bestArtist}>{track.artist_name}</div>
          </div>

          {track.review && (
            <div className={styles.satarContainer}>
              <StarSelector
                rating={track.review.rate}
                setRating={function (value: number): void {}}
                disableHover
              />
            </div>
          )}
        </div>
        {track.review && (
          <>
            <div className={styles.bestComment}>
              <i>"{track.review.comment}"</i>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
