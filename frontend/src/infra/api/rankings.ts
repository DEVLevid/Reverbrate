import { apiRequest } from './config';
import { RankingsResponse } from '@/types/rankings';

export const RankingsApi = {
  getUserRankings: async (): Promise<RankingsResponse> => {
    return apiRequest<RankingsResponse>('/rankings/user');
  },
};