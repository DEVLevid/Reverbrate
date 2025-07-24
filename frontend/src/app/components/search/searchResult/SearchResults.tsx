"use client";

import React from "react";
import { TrackWithReview, AlbumItem, ArtistItem } from "@/types/search";
import styles from "./styles.module.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import TracksResult from "./tracks/tracksResult";
import BestResult from "./bestResult/bestResult";
import AlbumsResult from "./albumResult/albumResult";
import ArtistsResult from "./artistResult/artistResult";
import UserResult from './userResult';
import { UserSearchResult } from '@/types/user';

interface SearchResultsProps {
  tracks: TrackWithReview[];
  albums: AlbumItem[];
  artists: ArtistItem[];
  users: UserSearchResult[];
  isLoading: boolean;
  error: Error | null;
  hasSearched: boolean;
}

export default function SearchResults({
  tracks,
  albums,
  artists,
  users,
  isLoading,
  error,
  hasSearched,
}: SearchResultsProps) {
  if (!hasSearched) {
    return <></>;
  }
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 40, color: "#7C6AA0" }}
                spin
              />
            }
          />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          Erro ao buscar músicas: {error.message}
        </div>
      </div>
    );
  }
  if (tracks.length === 0 && hasSearched) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>Nenhuma música encontrada</div>
      </div>
    );
  }
  const bestTrack = tracks.length > 0 ? tracks[0] : null;
  const otherTracks = tracks.length > 1 ? tracks.slice(1) : [];
  return (
    <div className={styles.container}>
      <UserResult users={users} />
      <div className={styles.tracksAndBestResultContainer}>
        <div className={styles.bestResultContainer}>
          <h2 className={styles.title}>Melhor Resultado</h2>
          <BestResult track={bestTrack} />
        </div>
        <div className={styles.tracksContainer}>
          <h2 className={styles.title}>Músicas</h2>
          <div className={styles.trackList}>
            <TracksResult
              tracks={otherTracks}
              isLoading={false}
              error={new Error()}
              hasSearched={true}
            />
          </div>
        </div>
      </div>
      <div className={styles.albumContainer}>
        <AlbumsResult albums={albums} />
      </div>
      <div className={styles.artistContainer}>
        <ArtistsResult artists={artists} />
      </div>
    </div>
  );
}
