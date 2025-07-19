import React from "react";
import styles from "./styles.module.scss";

export default function UserInfoSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.imageSkeleton} />
            <div className={styles.infoWrapperSkeleton}>
                <div className={styles.titleWrapperSkeleton}>
                    <div className={styles.nameSkeleton} />
                    <div className={styles.idWrapperSkeleton}>
                        <div className={styles.idTextSkeleton} />
                        <div className={styles.copyIconSkeleton} />
                    </div>
                </div>
                <div className={styles.bioSkeleton} />
            </div>
        </div>
    );
}
