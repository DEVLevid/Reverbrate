"use client"

import { useState, useEffect } from 'react';
import { useSearch } from '../../../hooks/useSearch';
import { useSearchContext } from '../../../contexts/SearchContext';
import SearchResults from '../searchResult/SearchResults';
import RecentActivity from '../../recentActivity/recentActivity';
import { ArtistItem, AlbumItem, TrackWithReview } from '@/types/search';
import { UserSearchResult } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { UserApi } from '@/infra/api/user';
import PopularAvaliators from '../../popularAvaliators/popularAvaliators';

export default function SearchContainer() {
  const { searchQuery } = useSearchContext();
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { searchTracks, searchAlbums, searchArtists } = useSearch();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: tracksData, isLoading: isLoadingTracks, error: errorTracks } = searchTracks({
    query: debouncedQuery,
    type: 'track',
    limit: 40,
    offset: 0
  });

  const { data: albumsData, isLoading: isLoadingAlbums, error: errorAlbums } = searchAlbums({
    query: debouncedQuery,
    limit: 40,
    offset: 0
  });

  const { data: artistsData, isLoading: isLoadingArtists, error: errorArtists } = searchArtists({
    query: debouncedQuery,
    limit: 40,
    offset: 0
  });

  const {
    data: userData,
    isLoading: isLoadingUsers,
    error: errorUsers
  } = useQuery({
    queryKey: ['userSearch', debouncedQuery, 20, 0],
    queryFn: () => UserApi.searchUsers(debouncedQuery, 20, 0),
    enabled: !!debouncedQuery,
    retry: false,
  });
  function isApiError(error: unknown): error is { status: number } {
    return typeof error === 'object' && error !== null && 'status' in error && typeof (error as any).status === 'number';
  }

  const users: UserSearchResult[] = isApiError(errorUsers) && errorUsers.status === 404 ? [] : (userData?.data || []);

  const tracks: TrackWithReview[] = tracksData?.tracks?.data || [];
  const albums: AlbumItem[] = albumsData?.albums?.data || [];
  const artists: ArtistItem[] = artistsData?.artists?.data || [];

  const isLoading = isLoadingTracks || isLoadingAlbums || isLoadingArtists || isLoadingUsers;
  const error = errorTracks || errorAlbums || errorArtists || (isApiError(errorUsers) && errorUsers.status !== 404 ? errorUsers : null) || null;

  if (!!debouncedQuery) {
    return (
      <div>
        <SearchResults 
          tracks={tracks}
          albums={albums}
          artists={artists}
          users={users}
          isLoading={isLoading}
          error={error}
          hasSearched={!!debouncedQuery}
        />
      </div>
    );
  }
  return (
    <>
      <RecentActivity />
      <PopularAvaliators />
    </>
  );
} 