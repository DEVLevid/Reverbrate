'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { CommentService } from '../../services/commentService';
import {
  CreateCommentRequest,
  UpdateCommentRequest,
  CommentListRequest,
  CommentByTrackRequest,
} from '../../types/comment';

export function useComments() {
  const fetchComments = (request: CommentListRequest) => useQuery({
    queryKey: ['comments', request],
    queryFn: () => CommentService.getComments(request.limit || 20, request.offset || 0),
  });

  const fetchCommentById = (id: string) => useQuery({
    queryKey: ['comments', 'byId', id],
    queryFn: () => CommentService.getCommentById(id),
  });

  const fetchCommentsByTrackId = (request: CommentByTrackRequest) => useQuery({
    queryKey: ['comments', 'byTrack', request],
    queryFn: () => CommentService.getCommentsByTrackId(
      request.trackId, 
      request.limit || 20, 
      request.offset || 0
    ),
  });

  const createCommentMutation = useMutation({
    mutationFn: (data: CreateCommentRequest) => CommentService.createComment(data),
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCommentRequest }) => 
      CommentService.updateComment(id, data),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: string) => CommentService.deleteComment(id),
  });

  return {
    fetchComments,
    fetchCommentById,
    fetchCommentsByTrackId,
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
  };
}
