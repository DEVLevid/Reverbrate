import React from "react";
import styles from "./styles.module.scss";
import CardBase from "../../base/cardBase/cardBase";
import { StarSelector } from "../../base/starSelector/starSelector";
import { Review } from "@/types/reviews";
import { StarFilled } from "@ant-design/icons";
import { useProfile } from "@/app/hooks/useProfile";
import { formatDate } from "@/lib/utils";

interface MusicReviewCardProps {
  review: Review;
}

const MusicReviewCard: React.FC<MusicReviewCardProps> = ({ review }) => {
  const { getProfile } = useProfile();
  const { data: profile } = getProfile();

  return (
    <CardBase className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${review.track_info.cover})` }}
      >
        <div className={styles.overlay}>
          <h3 className={styles.title}>{review.track_info.name}</h3>
          <p className={styles.artist}>🎵 {review.track_info.artist}</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.user}>
          <div className={styles.userInfo}>
            <img className={styles.avatar} src={profile?.image} />
            <div className={styles.userInfoText}>
              <p className={styles.username}>{profile?.name}</p>
              <p className={styles.time}>
                {formatDate(review.review.created_at)}
              </p>
            </div>
          </div>
          <div className={styles.rating}>
            <p>
              {review.review.rate} <StarFilled style={{ color: "#FFD700" }} />{" "}
            </p>
          </div>
        </div>
        <blockquote className={styles.comment}>
          "{review.review.comment}"
        </blockquote>
      </div>
    </CardBase>
  );
};

export default MusicReviewCard;
