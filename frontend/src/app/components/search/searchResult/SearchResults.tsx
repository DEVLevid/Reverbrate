"use client"

import React from 'react';
import { TrackWithReview } from '@/types/search';
import styles from './styles.module.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { DotsThree, DotsThreeVertical } from '@phosphor-icons/react/dist/ssr';
import BaseReview from '../../review/review';

interface SearchResultsProps {
  tracks: TrackWithReview[];
  isLoading: boolean;
  error: any;
  hasSearched: boolean;
}

export default function SearchResults({ tracks, isLoading, error, hasSearched }: SearchResultsProps) {
  if (!hasSearched) {
    return (
      <></>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#7C6AA0' }} spin />} />
        </div>
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
      <div className={styles.trackList}>
        {tracks.map((track) => (
          <div key={track.id} className={styles.trackItem}>
            <div className={styles.trackCover} style={{ cursor: 'pointer' }}>
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
              <p className={styles.trackArtist}>{track.artist_name}</p>
            </div>
            <BaseReview track={track} />
            <DotsThree size={22} />
          </div>
        ))}
      </div>
    </div>
  );
} 