import React from 'react';
import { TrackWithReview } from '@/types/search';
import { DotsThree } from '@phosphor-icons/react/dist/ssr';
import BaseReview from '@/app/components/review/review';
import styles from './styles.module.scss';

interface TracksResultProps {
    tracks: TrackWithReview[];
    isLoading: boolean;
    error: Error;
    hasSearched: boolean;
}

export default function TracksResult({ tracks }: TracksResultProps) {
  return (
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
  )
}
