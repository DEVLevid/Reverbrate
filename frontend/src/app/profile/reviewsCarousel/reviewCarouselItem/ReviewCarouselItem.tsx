import { StarSelector } from "@/app/components/base/starSelector/starSelector";
import { Review } from "@/types/reviews";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { Button } from "antd";
import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.scss";

interface ReviewCarouselItemProps {
    data: Review;
}

export default function ReviewCarouselItem({ data }: ReviewCarouselItemProps) {
    const [rating, setRating] = useState(data?.review.rate || 0);

    return (
        <div className={styles.carouselItemContainer}>
            <Image
                src={data.track_info.cover}
                alt={`Capa da música ${data.track_info.name}`}
                width={100}
                height={100}
                className={styles.carouselItemImage}
            />

            <div className={styles.carouselItemTextWrapper}>
                <div className={styles.carouselItemTitleWrapper}>
                    <>
                        <h3>{data.track_info.name}</h3>
                        <Button type="text">
                            <DotsThreeIcon color="#fff" size={32} />
                        </Button>
                    </>
                </div>

                <span>{data.track_info.artist}</span>

                <p className={styles.carouselItemComment}>
                    {data.review.comment}
                </p>

                <StarSelector rating={rating} setRating={setRating} />
            </div>
        </div>
    );
}
