"use client"

import { useState, useEffect } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { useSearchContext } from '../../contexts/SearchContext';
import SearchResults from './SearchResults';

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

  const tracks = data?.tracks?.data || [];

  return (
    <div>
      <SearchResults 
        tracks={tracks}
        isLoading={isLoading}
        error={error}
        hasSearched={!!debouncedQuery}
      />
    </div>
  );
} 