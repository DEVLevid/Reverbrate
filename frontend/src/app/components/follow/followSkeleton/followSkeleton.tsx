import React from "react";
import styles from "./styles.module.scss";

function InfoViewSkeleton() {
    return (
        <div className={styles.wrapperSkeleton}>
            <div>
                <div className={styles.titleSkeleton} />
                <div className={styles.valueSkeleton} />
            </div>
        </div>
    );
}

export default function FollowSkeleton() {
    return (
        <div className={styles.container}>
            <InfoViewSkeleton />
            <InfoViewSkeleton />
            <InfoViewSkeleton />
            <InfoViewSkeleton />
        </div>
    );
}
