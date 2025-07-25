import { apiRequest } from "./config";
import { RankingsResponse, RankingTracksResponse } from "@/types/rankings";

export const RankingsApi = {
  getUserRankings: async (): Promise<RankingsResponse> => {
    return apiRequest<RankingsResponse>("/rankings/user");
  },

  getTrackRankings: async (
    limit = 20,
    offset = 0
  ): Promise<RankingTracksResponse> => {
    return apiRequest<RankingTracksResponse>(
      `/rankings/tracks?limit=${limit}&offset=${offset}`
    );
  },
};
