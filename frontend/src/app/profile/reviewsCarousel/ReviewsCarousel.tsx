import { ReviewsResponse } from "@/types/reviews";
import { Carousel } from "antd";
import ReviewCarouselItem from "./reviewCarouselItem/ReviewCarouselItem";
import styles from "./styles.module.scss";

interface ReviewsCarouselProps {
    reviews: ReviewsResponse;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
    const groupedReviews = chunkArray(
        reviews.data?.length ? reviews.data : Array(8).fill(null),
        8
    );

    return (
        <div className={styles.carouselContainer}>
            <h2>Avaliações recentes</h2>
            <Carousel fade arrows draggable className={styles.carousel}>
                {groupedReviews.map((group, index) => (
                    <div key={index} className={styles.reviewGroup}>
                        {group.map((review, i) => (
                            <ReviewCarouselItem
                                key={review?.id || i}
                                data={review}
                            />
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default ReviewsCarousel;
