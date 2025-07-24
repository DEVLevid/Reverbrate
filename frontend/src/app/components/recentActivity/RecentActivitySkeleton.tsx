import React from "react";
import style from "./styles.module.scss";

export default function RecentActivitySkeleton() {
  return (
    <div className={style.skeletonContainer}>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div className={style.skeletonCard} key={idx}>
          <div className={style.skeletonTrackContainer}>
            <div className={style.skeletonAlbumCover} />
            <div className={style.skeletonTrackInfo}>
              <div className={style.skeletonName} />
              <div className={style.skeletonArtist} />
            </div>
          </div>
          <div className={style.skeletonStars} />
          <div className={style.skeletonComment} />
        </div>
      ))}
    </div>
  );
} 