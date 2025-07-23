"use client"

import { useState, useEffect } from 'react';
import { useSearch } from '../../../hooks/useSearch';
import { useSearchContext } from '../../../contexts/SearchContext';
import SearchResults from '../searchResult/SearchResults';
import RecentActivity from '../../recentActivity/recentActivity';
import { ArtistItem, AlbumItem, TrackWithReview } from '@/types/search';
import Rankings from '../../rankings/rankings';

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

  const tracks: TrackWithReview[] = tracksData?.tracks?.data || [];
  const albums: AlbumItem[] = albumsData?.albums?.data || [];
  const artists: ArtistItem[] = artistsData?.artists?.data || [];

  const isLoading = isLoadingTracks || isLoadingAlbums || isLoadingArtists;
  const error = errorTracks || errorAlbums || errorArtists || null;

  if (!!debouncedQuery) {
    return (
      <div>
        <SearchResults 
          tracks={tracks}
          albums={albums}
          artists={artists}
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
      <Rankings />
    </>
  );
} 