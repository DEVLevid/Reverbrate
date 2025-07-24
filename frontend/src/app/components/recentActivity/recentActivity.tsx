"use client";

import React from "react";
import style from "./styles.module.scss";
import { useReviews } from "../../hooks/useReviews";
import { Carousel } from "antd";
import RecentActivitySkeleton from "./RecentActivitySkeleton";
import CardReview from "../cardReview/cardReview";

export default function RecentActivity() {
  const { fetchReviews } = useReviews();
  const { data, isLoading, error } = fetchReviews({ limit: 20, offset: 0 });

  const reviews = data?.data || [];
  const chunkSize = 5;
  const slides = [];
  for (let i = 0; i < reviews.length; i += chunkSize) {
    slides.push(reviews.slice(i, i + chunkSize));
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>Atividades Recentes</h2>
      {isLoading && (
        <RecentActivitySkeleton />
      )}
      {error && <div>Erro ao carregar avaliações.</div>}
      {!isLoading && !error && reviews.length === 0 && (
        <h3>Faça uma avaliação para ver as atividades recentes!</h3>
      )}
      {!isLoading && !error && reviews.length > 0 && (
        <Carousel
          arrows
          dots={false}
          infinite={false}
          className={style.carousel}
          slidesToShow={4}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1200,
              settings: { slidesToShow: 3 }
            },
            {
              breakpoint: 800,
              settings: { slidesToShow: 1 }
            }
          ]}
        >
          {reviews.map((review) => (
            <div key={review.track_info.id} className={style.carouselContent}>
              <CardReview
                review={review}
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
