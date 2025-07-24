import React from "react";
import style from "./styles.module.scss";
import CardBase from "../base/cardBase/cardBase";
import { StarSelector } from "../base/starSelector/starSelector";
import Image from "next/image";
import { Review } from "@/types/reviews";

interface CardReviewProps {
  review: Review;
}

function formatRelativeDate(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return "agora mesmo";
  if (diffMin < 60)
    return `há ${diffMin} ${diffMin === 1 ? "minuto" : "minutos"}`;
  if (diffHour < 24)
    return `há ${diffHour} ${diffHour === 1 ? "hora" : "horas"}`;
  if (diffDay < 7) return `há ${diffDay} ${diffDay === 1 ? "dia" : "dias"}`;
  return date.toLocaleDateString("pt-BR");
}

export default function CardReview({
  review,
}: CardReviewProps) {
  return (
    <CardBase>
      <div className={style.reviewContent}>
        <div className={style.trackContainer}>
          <div className={style.albumCoverContainer}>
            <img src={review.track_info.cover} alt={review.track_info.name} className={style.albumCover} />
          </div>
          <div className={style.trackInfoContainer}>
            <div className={style.trackInfo}>
              <div className={style.name}>{review.track_info.name}</div>
              <div className={style.artist}>{review.track_info.artist}</div>
            </div>
            <div className={style.starSelector}>
              <StarSelector rating={review.rate} setRating={() => {}} disabled />
            </div>
          </div>
        </div>
        <div className={style.reviewerContainer}>
          <div className={style.reviewerImageContainer}>
            <Image
              src={review.created_by.image}
              alt={review.created_by.name}
              width={50}
              height={50}
            ></Image>
          </div>
          <div className={style.reviewerInfoContainer}>
            <div className={style.reviewerInfo}>
              <div className={style.reviewerName}>{review.created_by.name}</div>
              <span>-</span>
              <div className={style.reviewerNickname}>{review.created_by.nickname}</div>
            </div>
            <div className={style.reviewDate}>
              {formatRelativeDate(review.created_at)}
            </div>
          </div>
        </div>
        <div className={style.comment}>
          <i>
            "{review.comment.length > 40 ? review.comment.slice(0, 30) + "..." : review.comment}"
          </i>
        </div>
      </div>
    </CardBase>
  );
}
