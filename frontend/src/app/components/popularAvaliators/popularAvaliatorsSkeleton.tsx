import React from "react";
import { Skeleton } from "antd";
import styles from "./styles.module.scss";

export default function PopularAvaliatorsSkeleton() {
  return (
    <div>
      <div className={styles.title}>
        <h2>Avaliadores Populares</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.avaliators}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div className={styles.avaliator} key={idx}>
              <div>
                <Skeleton.Avatar active size={50} shape="square" />
              </div>
              <div className={styles.avaliatorInfo}>
                <Skeleton.Input style={{ width: 100, height: 24 }} active size="small" />
                <div className={styles.avaliatorStats}>
                  <Skeleton.Input style={{ width: 60, height: 18 }} active size="small" />
                  <span>•</span>
                  <Skeleton.Input style={{ width: 60, height: 18 }} active size="small" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}