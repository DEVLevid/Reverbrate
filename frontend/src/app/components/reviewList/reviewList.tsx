import { ReviewsResponse } from "@/types/reviews";
import { TrackWithReview } from "@/types/search";
import { Pagination } from "antd";
import { useState } from "react";
import MusicItem from "../musicItem/musicItem";
import styles from "./styles.module.scss";

interface ReviewListProps {
    title: string;
    reviews: ReviewsResponse;
}

export default function ReviewList({ title, reviews }: ReviewListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentReviews = reviews.data.slice(startIndex, endIndex);

    return (
        <div className={styles.container}>
            <h3>{title}</h3>
            <div className={styles.wrapper}>
                {currentReviews.length <= 0 ? (
                    <i className={styles.noReviews}>
                        Você ainda não possui avaliações...
                    </i>
                ) : (
                    currentReviews.map((review) => {
                        const trackWithReview: TrackWithReview = {
                            artist_name: review.track_info.artist,
                            cover: review.track_info.cover,
                            id: review.track_info.id,
                            name: review.track_info.name,
                            uri: "",
                            type: "track",
                            review: {
                                rate: review.rate,
                                comment: review.comment,
                                created_at: review.created_at,
                                updated_at: review.updated_at,
                            },
                        };
                        return (
                            <MusicItem
                                key={trackWithReview.id}
                                track={trackWithReview}
                            />
                        );
                    })
                )}
            </div>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={reviews.total} // Avaliar uso
                onChange={handlePageChange}
                className={styles.reviewPagination}
            />
        </div>
    );
}
