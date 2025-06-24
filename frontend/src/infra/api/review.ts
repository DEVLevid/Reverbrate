import { apiRequest } from './config';
import {
  ReviewsResponse,
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from '../../types/reviews';

export const ReviewsApi = {

  getReviews: async (limit = 50, offset = 0): Promise<ReviewsResponse> => {
    return apiRequest<ReviewsResponse>(`/reviews?limit=${limit}&offset=${offset}`);
  },

  getReviewById: async (id: string): Promise<Review> => {
    return apiRequest<Review>(`/reviews/${id}`);
  },

  createReview: async (data: CreateReviewRequest): Promise<Review> => {
    return apiRequest<Review>('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateReview: async (id: string, data: UpdateReviewRequest): Promise<Review> => {
    return apiRequest<Review>(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteReview: async (id: string): Promise<void> => {
    return apiRequest<void>(`/reviews/${id}`, {
      method: 'DELETE',
    });
  },

  getReviewsByTrackId: async (trackId: string, limit = 20, offset = 0): Promise<ReviewsResponse> => {
    return apiRequest<ReviewsResponse>(`/reviews/track/${trackId}?limit=${limit}&offset=${offset}`);
  },
};
