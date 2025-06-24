import { StarIcon } from "@phosphor-icons/react";

import styles from "./styles.module.scss";

function PlayerMusicReview() {
  const rating = 3;

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        size={20}
        weight="fill"
        className={index < rating ? styles.starFilled : styles.star}
      />
    ));
  };

  return (
    <section className={styles.musicReviewContainer}>
      <span>Avalie</span>

      <div className={styles.starsContainer}>{renderStars()}</div>
    </section>
  );
}

export default PlayerMusicReview;
