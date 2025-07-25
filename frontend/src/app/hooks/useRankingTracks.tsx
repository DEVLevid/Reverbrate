import { useQuery } from '@tanstack/react-query';
import { RankingsApi } from '@/infra/api/rankings';

export function useRankingTracks() {
  const fetchRankingTracks = (limit = 20, offset = 0) =>
    useQuery({
        queryKey: ['rankingTracks', limit, offset],
        queryFn: () => RankingsApi.getTrackRankings(limit, offset),
    });

  return {
    fetchRankingTracks,
  };
} 