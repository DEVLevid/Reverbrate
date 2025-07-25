import React from "react";
import { Skeleton } from "antd";
import styles from "./styles.module.scss";

export default function RankingTracksSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Top 5 Músicas</h2>
      </div>
      <div className={styles.tracks}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div className={styles.trackContainer} key={idx}>
            <div className={styles.trackInfo}>
              <div className={styles.trackCover}>
                <Skeleton.Avatar active size={50} shape="square" />
              </div>
              <div className={styles.trackNameContainer}>
                <div className={styles.trackName}>
                  <Skeleton.Input style={{ width: 120, height: 20 }} active size="small" />
                  <span>-</span>
                  <Skeleton.Input style={{ width: 80, height: 16 }} active size="small" />
                </div>
                <div style={{ marginTop: 4, display: 'flex', gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton.Avatar key={i} size={16} shape="square" style={{ background: 'hsl(255, 20%, 4%)' }} />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.trackActions}>
              <div className={styles.usersReview}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton.Avatar key={i} size={20} shape="square" style={{ background: '    hsl(255, 20%, 4%)' }} />
                ))}
              </div>
              <div className={styles.iconContainer}>
                <Skeleton.Avatar size={22}  />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 