"use client"

import React from 'react';
import { SearchTrack } from '@/types/search';
import styles from './searchResults.module.scss';

interface SearchResultsProps {
  tracks: SearchTrack[];
  isLoading: boolean;
  error: any;
  hasSearched: boolean;
}

export default function SearchResults({ tracks, isLoading, error, hasSearched }: SearchResultsProps) {
  if (!hasSearched) {
    return (
      <div className={styles.container}>
        <div className={styles.welcome}>
          <h2>Bem-vindo ao Reverbrate</h2>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Erro ao buscar músicas: {error.message}</div>
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resultados da busca</h2>
      <div className={styles.trackList}>
        {tracks.map((track) => (
          <div key={track.id} className={styles.trackItem}>
            <div className={styles.trackCover}>
              {track.cover ? (
                <img src={track.cover} alt={track.name} />
              ) : (
                <div className={styles.placeholderCover}>
                  <span>🎵</span>
                </div>
              )}
            </div>
            <div className={styles.trackInfo}>
              <h3 className={styles.trackName}>{track.name}</h3>
              <p className={styles.trackArtist}>{track.artist}</p>
              {track.album && (
                <p className={styles.trackAlbum}>{track.album}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 