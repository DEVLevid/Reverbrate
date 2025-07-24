import React from "react";
import style from "./styles.module.scss";
import CardBase from "../base/cardBase/cardBase";
import { StarSelector } from "../base/starSelector/starSelector";
import Image from "next/image";

interface CardReviewProps {
  cover: string;
  trackName: string;
  artist: string;
  rate: number;
  comment: string;
  reviewerImage: string;
  reviewerName: string;
  reviewerNickname: string;
  createdAt: string;
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
  cover,
  trackName,
  artist,
  rate,
  comment,
  reviewerImage,
  reviewerName,
  reviewerNickname,
  createdAt,
}: CardReviewProps) {
  return (
    <CardBase>
      <div className={style.reviewContent}>
        <div className={style.trackContainer}>
          <div className={style.albumCoverContainer}>
            <img src={cover} alt={trackName} className={style.albumCover} />
          </div>
          <div className={style.trackInfoContainer}>
            <div className={style.trackInfo}>
              <div className={style.name}>{trackName}</div>
              <div className={style.artist}>{artist}</div>
            </div>
            <div className={style.starSelector}>
              <StarSelector rating={rate} setRating={() => {}} disabled />
            </div>
          </div>
        </div>
        <div className={style.reviewerContainer}>
          <div className={style.reviewerImageContainer}>
            <Image
              src={reviewerImage}
              alt={reviewerName}
              width={50}
              height={50}
            ></Image>
          </div>
          <div className={style.reviewerInfoContainer}>
            <div className={style.reviewerInfo}>
              <div className={style.reviewerName}>{reviewerName}</div>
              <span>-</span>
              <div className={style.reviewerNickname}>{reviewerNickname}</div>
            </div>
            <div className={style.reviewDate}>
              {formatRelativeDate(createdAt)}
            </div>
          </div>
        </div>
        <div className={style.comment}>
          <i>
            "{comment.length > 40 ? comment.slice(0, 30) + "..." : comment}"
          </i>
        </div>
      </div>
    </CardBase>
  );
}
