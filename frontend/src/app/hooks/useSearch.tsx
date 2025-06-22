'use client';

import { useQuery } from '@tanstack/react-query';
import { SearchApi, SearchParams } from '../../infra/api/search';

export function useSearch() {
  const searchTracks = (params: SearchParams) => useQuery({
    queryKey: ['search', 'tracks', params],
    queryFn: () => SearchApi.search(params),
    enabled: !!params.query, 
  });

  const searchArtists = (params: Omit<SearchParams, 'type'>) => useQuery({
    queryKey: ['search', 'artists', params],
    queryFn: () => SearchApi.search({ ...params, type: 'artist' }),
    enabled: !!params.query,
  });

  const searchAlbums = (params: Omit<SearchParams, 'type'>) => useQuery({
    queryKey: ['search', 'albums', params],
    queryFn: () => SearchApi.search({ ...params, type: 'album' }),
    enabled: !!params.query,
  });

  return {
    searchTracks,
    searchArtists,
    searchAlbums,
  };
}