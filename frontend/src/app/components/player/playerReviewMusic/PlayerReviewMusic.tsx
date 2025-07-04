import { StarIcon } from "@phosphor-icons/react";

import styles from "./styles.module.scss";
import BaseReview from "../../review/review";
import { usePlayerContext as usePlayer } from "@/app/contexts/PlayerContext";

function PlayerMusicReview() {
  const { currentTrack } = usePlayer();
  if (!currentTrack) return null;

  return (
    <section className={styles.musicReviewContainer}>
      <span>Avalie</span>

      <BaseReview track={currentTrack} />
    </section>
  );
}

export default PlayerMusicReview;
