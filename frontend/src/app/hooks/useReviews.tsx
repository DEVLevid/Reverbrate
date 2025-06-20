'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ReviewService } from '../../services/ReviewService';
import {
  CreateReviewRequest,
  UpdateReviewRequest,
  ReviewListRequest,
  ReviewByTrackRequest,
} from '../../types/reviews';

export function useReviews() {
  const fetchReviews = (request: ReviewListRequest) => useQuery({
    queryKey: ['reviews', request],
    queryFn: () => ReviewService.getReviews(request.limit || 20, request.offset || 0),
  });

  const fetchReviewsById = (id: string) => useQuery({
    queryKey: ['reviews', 'byId', id],
    queryFn: () => ReviewService.getReviewById(id),
  });

  const fetchReviewsByTrackId = (request: ReviewByTrackRequest) => useQuery({
    queryKey: ['reviews', 'byTrack', request],
    queryFn: () => ReviewService.getReviewsByTrackId(
      request.trackId, 
      request.limit || 20, 
      request.offset || 0
    ),
  });

  const createReviewMutation = useMutation({
    mutationFn: (data: CreateReviewRequest) => ReviewService.createReview(data),
  });

  const updateReviewMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewRequest }) => 
      ReviewService.updateReview(id, data),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id: string) => ReviewService.deleteReview(id),
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
