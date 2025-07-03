import { Skeleton } from "antd";
import styles from ".././styles.module.scss";

export default function ReviewsCarouselItemSkeleton() {
    return (
        <div className={styles.carouselItemContainer}>
            <Skeleton.Avatar
                active
                shape="square"
                size={100}
                className={styles.carouselItemImage}
            />
            <div className={styles.carouselItemTextWrapper}>
                <div className={styles.carouselItemTitleWrapper}>
                    <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 120 }}
                    />
                </div>
                <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 100, marginBottom: 8 }}
                />
                <Skeleton
                    paragraph={{ rows: 1, width: ["100%", "80%"] }}
                    active
                />
            </div>
        </div>
    );
}
