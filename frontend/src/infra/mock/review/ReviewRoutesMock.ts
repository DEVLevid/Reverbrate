import { ReviewsApi } from '../../api/review';
import {
  ReviewsResponse,
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from '../../../types/reviews';
import { ApiError } from '../../api/config';

export class ReviewRoutesMock {
  static async getReviews(limit = 20, offset = 0): Promise<ReviewsResponse> {
    try {
      return await ReviewsApi.getReviews(limit, offset);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Erro ao buscar comentários: ${error.message}`);
      }
      throw new Error('Erro inesperado ao buscar comentários');
    }
  }

  static async getReviewById(id: string): Promise<Review> {
    try {
      return await ReviewsApi.getReviewById(id);
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

  static async createReview(data: CreateReviewRequest): Promise<Review> {
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

      return await ReviewsApi.createReview(data);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 400) {
          throw new Error('Dados inválidos para criar a avaliação');
        }
        if (error.status === 409) {
          throw new Error('Você já comentou nesta música');
        }
        throw new Error(`Erro ao criar avaliação: ${error.message}`);
      }
      throw error 
    }
  }

  static async updateReview(id: string, data: UpdateReviewRequest): Promise<Review> {
    try {
      if (data.rate !== undefined && (data.rate < 1 || data.rate > 5)) {
        throw new Error('Avaliação deve estar entre 1 e 5');
      }
      if (data.comment !== undefined && data.comment.trim().length === 0) {
        throw new Error('Comentário não pode estar vazio');
      }

      return await ReviewsApi.updateReview(id, data);
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

  static async deleteReview(id: string): Promise<void> {
    try {
      await ReviewsApi.deleteReview(id);
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

  static async getReviewsByTrackId(trackId: string, limit = 20, offset = 0): Promise<ReviewsResponse> {
    try {
      return await ReviewsApi.getReviewsByTrackId(trackId, limit, offset);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Erro ao buscar comentários da música: ${error.message}`);
      }
      throw new Error('Erro inesperado ao buscar comentários da música');
    }
  }
}
