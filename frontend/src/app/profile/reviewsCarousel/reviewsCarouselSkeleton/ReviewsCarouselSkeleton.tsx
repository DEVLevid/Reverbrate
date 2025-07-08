import { Carousel } from "antd";
import ReviewsCarouselItemSkeleton from "../reviewCarouselItem/reviewsCarouselItemSkeleton/ReviewsCarouselItemSkeleton";
import styles from ".././styles.module.scss";

function ReviewsCarouselSkeleton() {
    return (
        <div className={styles.carouselContainer}>
            <h2>Avaliações recentes</h2>
            <Carousel fade arrows draggable className={styles.carousel}>
                <div className={styles.reviewGroup}>
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <ReviewsCarouselItemSkeleton key={idx} />
                    ))}
                </div>
            </Carousel>
        </div>
    );
}

export default ReviewsCarouselSkeleton;
