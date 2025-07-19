import MusicItemSkeleton from "../../musicItem/musicItemSkeleton/musicItemSkeleton";
import styles from "./styles.module.scss";

export default function ReviewListSkeleton() {
    const pageSize = 5;

    return (
        <div className={styles.container}>
            <div className={styles.titleSkeleton} />

            <div className={styles.wrapper}>
                {Array.from({ length: pageSize }).map((_, index) => (
                    <MusicItemSkeleton key={index} />
                ))}
            </div>

            <div className={styles.paginationSkeleton}>
                <div className={styles.paginationItemSkeleton}></div>
                <div className={styles.paginationItemSkeleton}></div>
                <div className={styles.paginationItemSkeletonActive}></div>
                <div className={styles.paginationItemSkeleton}></div>
                <div className={styles.paginationItemSkeleton}></div>
            </div>
        </div>
    );
}
