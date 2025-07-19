import React from "react";
import styles from "./styles.module.scss";

export default function MusicItemSkeleton() {
    return (
        <div className={styles.itemSkeleton}>
            <div className={styles.infoWrapperSkeleton}>
                <div className={styles.imageSkeleton} />
                <div className={styles.infoWrapperTextSkeleton}>
                    <div className={styles.nameSkeleton} />

                    <div className={styles.artistSkeleton} />
                </div>
            </div>
            <div className={styles.reviewWrapperDesktopSkeleton}>
                <div className={styles.commentIconSkeleton} />

                <div className={styles.baseReviewSkeleton} />

                <div className={styles.optionBtnSkeleton} />
            </div>

            <div className={styles.reviewWrapperMobileSkeleton}>
                <div className={styles.baseReviewSkeleton} />
                <div className={styles.optionsSkeleton}>
                    <div className={styles.commentIconSkeleton} />
                    <div className={styles.optionBtnSkeleton} />
                </div>
            </div>
        </div>
    );
}
