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
        <Carousel
          infinite={false}
          dots={false}
          arrows={true}
          slidesToShow={5}
          slidesToScroll={1}
          className={style.carousel}
        >
          {reviews.map((review, idx) => (
            <div key={idx}>
              <div className={style.reviewList}>
                <CardBase key={review.id}>
                  <div className={style.reviewContent}>
                    <div className={style.coverContainer}>
                      <img
                        src={review.track_info.cover}
                        alt={review.track_info.name}
                        className={style.albumCover}
                      />

                      <div className={style.trackInfo}>
                        <div className={style.name}>
                          <h3>{review.track_info.name}</h3>
                        </div>
                        <div className={style.artist}>
                          <p>{review.track_info.artist}</p>
                        </div>
                      </div>

                      <div className={style.starSelector}>
                        <StarSelector
                          rating={review.review.rate}
                          setRating={() => {}}
                          disabled
                        />
                      </div>
                    </div>
                    <div className={style.comment}>
                      <p className={style.commentText}>
                        "{review.review.comment.length > 40
                          ? review.review.comment.slice(0, 30) + "..."
                          : review.review.comment}"
                      </p>
                    </div>
                  </div>
                </CardBase>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
