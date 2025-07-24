import styles from "./styles.module.scss";
import BaseReview from "../../review/review";
import { TrackWithReview } from "@/types/search";

function PlayerMusicReview({ track }: { track: TrackWithReview }) {
  return (
    <section className={styles.musicReviewContainer}>
      <div className={styles.reviewHeader}>
        <span className={styles.reviewTitle}>Avalie</span>
      </div>

      <div className={styles.starsContainer}>
        <BaseReview track={track} />
      </div>
    </section>
  );
}

export default PlayerMusicReview;
