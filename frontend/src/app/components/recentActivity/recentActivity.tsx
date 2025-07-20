"use client";

import React from "react";
import style from "./styles.module.scss";
import CardBase from "../base/cardBase/cardBase";
import { useReviews } from "../../hooks/useReviews";
import { StarSelector } from "../base/starSelector/starSelector";
import { Spin, Carousel } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
                  <CardBase key={review.id}>
                    <div className={style.reviewContent}>
                      <div className={style.trackContainer}>
                        <img
                          src={review.track_info.cover}
                          alt={review.track_info.name}
                          className={style.albumCover}
                        />
                        <div className={style.trackInfo}>
                          <div className={style.name}>
                            {review.track_info.name}
                          </div>
                          <div className={style.artist}>
                            {review.track_info.artist}
                          </div>
                        </div>
                      </div>
                      <div className={style.starSelector}>
                        <StarSelector
                          rating={review.rate}
                          setRating={() => {}}
                          disabled
                        />
                      </div>
                      <div className={style.comment}>
                        {review.comment.length > 40
                          ? review.comment.slice(0, 30) + "..."
                          : review.comment}
                      </div>
                    </div>
                  </CardBase>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
