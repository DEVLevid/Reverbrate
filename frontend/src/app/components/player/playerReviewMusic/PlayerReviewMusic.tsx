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
        color={index < rating ? '#ffe100' : '#1c1825'}
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
