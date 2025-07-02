import { StarSelector } from "@/app/components/base/starSelector/starSelector";
import { Review } from "@/types/reviews";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { Button, Skeleton } from "antd";
import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.scss";

interface ReviewCarouselItemProps {
    data?: Review;
}

export default function ReviewCarouselItem({ data }: ReviewCarouselItemProps) {
    const [rating, setRating] = useState(data?.review.rate || 0);
    const loading = !data;

    return (
        <div className={styles.carouselItemContainer}>
            {loading ? (
                <Skeleton.Avatar
                    active
                    shape="square"
                    size={100}
                    className={styles.carouselItemImage}
                />
            ) : (
                <Image
                    src={data.track_info.cover}
                    alt={`Capa da música ${data.track_info.name}`}
                    width={100}
                    height={100}
                    className={styles.carouselItemImage}
                />
            )}

            <div className={styles.carouselItemTextWrapper}>
                <div className={styles.carouselItemTitleWrapper}>
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 120 }}
                        />
                    ) : (
                        <>
                            <h3>{data.track_info.name}</h3>
                            <Button type="text">
                                <DotsThreeIcon color="#fff" size={32} />
                            </Button>
                        </>
                    )}
                </div>

                {loading ? (
                    <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 100, marginBottom: 8 }}
                    />
                ) : (
                    <span>{data.track_info.artist}</span>
                )}

                {loading ? (
                    <Skeleton
                        paragraph={{ rows: 1, width: ["100%", "80%"] }}
                        active
                    />
                ) : (
                    <p>{data.review.comment}</p>
                )}

                {!loading && (
                    <StarSelector rating={rating} setRating={setRating} />
                )}
            </div>
        </div>
    );
}
