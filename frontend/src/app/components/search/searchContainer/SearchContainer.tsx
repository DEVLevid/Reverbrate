"use client";

import { useState, useEffect } from "react";
import { useSearch } from "../../../hooks/useSearch";
import { useSearchContext } from "../../../contexts/SearchContext";
import SearchResults from "../searchResult/SearchResults";
import RecentActivity from "../../recentActivity/recentActivity";
import { ArtistItem, AlbumItem, TrackWithReview } from "@/types/search";
import { UserSearchResult } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { UserApi } from "@/infra/api/user";
import Rankings from "../../rankings/rankings";
import PopularAvaliators from "../../popularAvaliators/popularAvaliators";
import styles from "./styles.module.scss";

export default function SearchContainer() {
  const { searchQuery } = useSearchContext();
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { searchTracks, searchAlbums, searchArtists } = useSearch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const isUserSearch =
    debouncedQuery.startsWith("@") && debouncedQuery.length > 1;
  const userQuery = isUserSearch ? debouncedQuery.slice(1) : "";

  const {
    data: tracksData,
    isLoading: isLoadingTracks,
    error: errorTracks,
  } = searchTracks({
    query: !isUserSearch ? debouncedQuery : "",
    type: "track",
    limit: 40,
    offset: 0,
  });

  const {
    data: albumsData,
    isLoading: isLoadingAlbums,
    error: errorAlbums,
  } = searchAlbums({
    query: !isUserSearch ? debouncedQuery : "",
    limit: 40,
    offset: 0,
  });

  const {
    data: artistsData,
    isLoading: isLoadingArtists,
    error: errorArtists,
  } = searchArtists({
    query: !isUserSearch ? debouncedQuery : "",
    limit: 40,
    offset: 0,
  });

  const {
    data: userData,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["userSearch", userQuery, 20, 0],
    queryFn: () => UserApi.searchUsers(userQuery, 20, 0),
    enabled: isUserSearch && !!userQuery,
    retry: false,
  });
  function isApiError(error: unknown): error is { status: number } {
    return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof (error as any).status === "number"
    );
  }

  const users: UserSearchResult[] = isUserSearch
    ? isApiError(errorUsers) && errorUsers.status === 404
      ? []
      : userData?.data || []
    : [];

  const tracks: TrackWithReview[] = isUserSearch
    ? []
    : tracksData?.tracks?.data || [];
  const albums: AlbumItem[] = isUserSearch
    ? []
    : albumsData?.albums?.data || [];
  const artists: ArtistItem[] = isUserSearch
    ? []
    : artistsData?.artists?.data || [];

  const isLoading = isUserSearch
    ? isLoadingUsers
    : isLoadingTracks || isLoadingAlbums || isLoadingArtists || isLoadingUsers;
  const error = isUserSearch
    ? (isApiError(errorUsers) && errorUsers.status !== 404
        ? errorUsers
        : null) || null
    : errorTracks ||
      errorAlbums ||
      errorArtists ||
      (isApiError(errorUsers) && errorUsers.status !== 404
        ? errorUsers
        : null) ||
      null;

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
    <div className={styles.searchContainer}>
      <RecentActivity />
      <div className={styles.rankingsContainer}>
        <div className={styles.rankings}>
          <Rankings />
        </div>
        <div className={styles.popularAvaliators}>
          <PopularAvaliators />
        </div>
      </div>
    </div>
  );
} 
