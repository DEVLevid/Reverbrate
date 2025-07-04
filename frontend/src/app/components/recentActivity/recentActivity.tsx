"use client";

import React from "react";
import style from "./styles.module.scss";
import CardBase from "../base/cardBase/cardBase";
import { useReviews } from "../../hooks/useReviews";
import { StarSelector } from "../base/starSelector/starSelector";
import { Spin, Carousel } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import MusicReviewCard from "./musicReviewCard/musicReviewCard";

export default function RecentActivity() {
  const { fetchReviews } = useReviews();
  const { data, isLoading, error } = fetchReviews({ limit: 20, offset: 0 });

  const reviews = data?.data || [];
  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < reviews.length; i += chunkSize) {
    slides.push(reviews.slice(i, i + chunkSize));
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>Atividades Recentes</h2>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 120,
          }}
        >
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 40, color: "#7C6AA0" }}
                spin
              />
            }
          />
        </div>
      )}
      {error && <div>Erro ao carregar avaliações.</div>}
      {!isLoading && !error && reviews.length === 0 && (
        <div>Nenhuma avaliação encontrada.</div>
      )}
      {!isLoading && !error && reviews.length > 0 && (
        <Carousel fade arrows infinite={true} className={style.carousel}>
          {slides.map((group, idx) => (
            <div key={idx}>
              <div className={style.carouselContent}>
                {group.map((review) => (
                  <MusicReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
