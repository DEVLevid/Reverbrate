'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ReviewRoutesMock } from '../../infra/mock/review/ReviewRoutesMock';
import {
  CreateReviewRequest,
  UpdateReviewRequest,
  ReviewListRequest,
  ReviewByTrackRequest,
} from '../../types/reviews';

export function useReviews() {
  const fetchReviews = (request: ReviewListRequest) => useQuery({
    queryKey: ['reviews', request],
    queryFn: () => ReviewRoutesMock.getReviews(request.limit || 20, request.offset || 0),
  });

  const fetchReviewsById = (id: string) => useQuery({
    queryKey: ['reviews', 'byId', id],
    queryFn: () => ReviewRoutesMock.getReviewById(id),
  });

  const fetchReviewsByTrackId = (request: ReviewByTrackRequest) => useQuery({
    queryKey: ['reviews', 'byTrack', request],
    queryFn: () => ReviewRoutesMock.getReviewsByTrackId(
      request.trackId, 
      request.limit || 20, 
      request.offset || 0
    ),
  });

  const createReviewMutation = useMutation({
    mutationFn: (data: CreateReviewRequest) => ReviewRoutesMock.createReview(data),
  });

  const updateReviewMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewRequest }) => 
      ReviewRoutesMock.updateReview(id, data),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id: string) => ReviewRoutesMock.deleteReview(id),
  });

  return {
    fetchReviews,
    fetchReviewsById,
    fetchReviewsByTrackId,
    createReviewMutation,
    updateReviewMutation,
    deleteReviewMutation
  };
}
