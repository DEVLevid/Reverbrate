import { apiRequest } from './config';
import {
  CommentsResponse,
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '../../types/comment';

export const commentsApi = {

  getComments: async (limit = 50, offset = 0): Promise<CommentsResponse> => {
    return apiRequest<CommentsResponse>(`/comments?limit=${limit}&offset=${offset}`);
  },

  getCommentById: async (id: string): Promise<Comment> => {
    return apiRequest<Comment>(`/comments/${id}`);
  },

  createComment: async (data: CreateCommentRequest): Promise<Comment> => {
    return apiRequest<Comment>('/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateComment: async (id: string, data: UpdateCommentRequest): Promise<Comment> => {
    return apiRequest<Comment>(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteComment: async (id: string): Promise<void> => {
    return apiRequest<void>(`/comments/${id}`, {
      method: 'DELETE',
    });
  },

  getCommentsByTrackId: async (trackId: string, limit = 20, offset = 0): Promise<CommentsResponse> => {
    return apiRequest<CommentsResponse>(`/comments/track/${trackId}?limit=${limit}&offset=${offset}`);
  },
};
