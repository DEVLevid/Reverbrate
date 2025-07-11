"use client"

import { useState, useEffect } from 'react';
import { useSearch } from '../../../hooks/useSearch';
import { useSearchContext } from '../../../contexts/SearchContext';
import SearchResults from '../searchResult/SearchResults';
import RecentActivity from '../../recentActivity/recentActivity';
import { ArtistItem, AlbumItem, TrackWithReview } from '@/types/search';
import { mockAlbums } from '@/infra/mock/search/mockAlbums';
import { mockArtists } from '@/infra/mock/search/mockArtists';

export default function SearchContainer() {
  const { searchQuery } = useSearchContext();
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { searchTracks } = useSearch();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, error } = searchTracks({
    query: debouncedQuery,
    type: 'track',
    limit: 20,
    offset: 0
  });

  const tracks: TrackWithReview[] = data?.tracks?.data || [];
  const albums: AlbumItem[] = data?.albums?.data || mockAlbums;
  const artists: ArtistItem[] = data?.artists?.data || mockArtists;

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
  return <RecentActivity />;
} 