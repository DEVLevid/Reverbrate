import { useQuery } from "@tanstack/react-query";
import { RankingsApi } from "@/infra/api/rankings";

export const useRankings = () => {
   const getUserRankings = useQuery({
    queryKey: ['rankings'],
    queryFn: () => RankingsApi.getUserRankings(),
   });

   return { getUserRankings };
};