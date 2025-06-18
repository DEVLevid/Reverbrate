import { commentsApi } from '../infra/api/comments';
import {
  CommentsResponse,
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '../types/comment';
import { ApiError } from '../infra/api/config';

export class CommentService {
  static async getComments(limit = 20, offset = 0): Promise<CommentsResponse> {
    try {
      return await commentsApi.getComments(limit, offset);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Erro ao buscar comentários: ${error.message}`);
      }
      throw new Error('Erro inesperado ao buscar comentários');
    }
  }

  static async getCommentById(id: string): Promise<Comment> {
    try {
      return await commentsApi.getCommentById(id);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new Error('Comentário não encontrado');
        }
        throw new Error(`Erro ao buscar comentário: ${error.message}`);
      }
      throw new Error('Erro inesperado ao buscar comentário');
    }
  }

  static async createComment(data: CreateCommentRequest): Promise<Comment> {
    try {
      if (!data.track_id) {
        throw new Error('ID da música é obrigatório');
      }
      if (data.rate < 1 || data.rate > 5) {
        throw new Error('Avaliação deve estar entre 1 e 5');
      }
      if (!data.comment || data.comment.trim().length === 0) {
        throw new Error('Comentário é obrigatório');
      }

      return await commentsApi.createComment(data);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 400) {
          throw new Error('Dados inválidos para criar comentário');
        }
        if (error.status === 409) {
          throw new Error('Você já comentou nesta música');
        }
        throw new Error(`Erro ao criar comentário: ${error.message}`);
      }
      throw error 
    }
  }

  static async updateComment(id: string, data: UpdateCommentRequest): Promise<Comment> {
    try {
      if (data.rate !== undefined && (data.rate < 1 || data.rate > 5)) {
        throw new Error('Avaliação deve estar entre 1 e 5');
      }
      if (data.comment !== undefined && data.comment.trim().length === 0) {
        throw new Error('Comentário não pode estar vazio');
      }

      return await commentsApi.updateComment(id, data);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new Error('Comentário não encontrado');
        }
        if (error.status === 403) {
          throw new Error('Você não tem permissão para editar este comentário');
        }
        throw new Error(`Erro ao atualizar comentário: ${error.message}`);
      }
      throw error; 
    }
  }

  static async deleteComment(id: string): Promise<void> {
    try {
      await commentsApi.deleteComment(id);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new Error('Comentário não encontrado');
        }
        if (error.status === 403) {
          throw new Error('Você não tem permissão para deletar este comentário');
        }
        throw new Error(`Erro ao deletar comentário: ${error.message}`);
      }
      throw new Error('Erro inesperado ao deletar comentário');
    }
  }

  static async getCommentsByTrackId(trackId: string, limit = 20, offset = 0): Promise<CommentsResponse> {
    try {
      return await commentsApi.getCommentsByTrackId(trackId, limit, offset);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Erro ao buscar comentários da música: ${error.message}`);
      }
      throw new Error('Erro inesperado ao buscar comentários da música');
    }
  }
}
