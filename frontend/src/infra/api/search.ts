import { SearchParams, SearchResponse } from '@/types/search';
import { apiRequest } from './config';
import { cookies } from 'next/headers';

export const SearchApi = {
  search: async (params: SearchParams): Promise<SearchResponse> => {
    const { query, type = 'track', limit = 20, offset = 0 } = params;
    
    const searchParams = new URLSearchParams({
      query,
      type,
      limit: limit.toString(),
      offset: offset.toString(),
    });

    return apiRequest<SearchResponse>(`/search?${searchParams.toString()}`);
  },
};
export type { SearchParams };

