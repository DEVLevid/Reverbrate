"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateReviewRequest,
  UpdateReviewRequest,
  ReviewListRequest,
  ReviewByTrackRequest,
} from "../../types/reviews";
import { ReviewsApi } from "@/infra/api/review";

export function useReviews() {
  const fetchReviews = (request: ReviewListRequest) =>
    useQuery({
      queryKey: ["reviews", request],
      queryFn: () =>
        ReviewsApi.getReviews(request.limit || 20, request.offset || 0),
    });

  const fetchReviewsById = (id: string) =>
    useQuery({
      queryKey: ["reviews", "byId", id],
      queryFn: () => ReviewsApi.getReviewById(id),
    });

  const fetchReviewsByTrackId = (request: ReviewByTrackRequest) =>
    useQuery({
      queryKey: ["reviews", "byTrack", request],
      queryFn: () =>
        ReviewsApi.getReviewsByTrackId(
          request.trackId,
          request.limit || 20,
          request.offset || 0
        ),
    });

  const createReviewMutation = useMutation({
    mutationFn: (data: CreateReviewRequest) => ReviewsApi.createReview(data),
  });

  const updateReviewMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewRequest }) =>
      ReviewsApi.updateReview(id, data),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id: string) => ReviewsApi.deleteReview(id),
  });

  return {
    fetchReviews,
    fetchReviewsById,
    fetchReviewsByTrackId,
    createReviewMutation,
    updateReviewMutation,
    deleteReviewMutation,
  };
}
