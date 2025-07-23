import React, { useState } from 'react';
import { TrackWithReview } from '@/types/search';
import { DotsThree } from '@phosphor-icons/react/dist/ssr';
import BaseReview from '@/app/components/review/review';
import styles from './styles.module.scss';
import { Dropdown, MenuProps } from 'antd';
import AddListModal from "@/app/components/list/addListModal/addListModal";

interface TracksResultProps {
    tracks: TrackWithReview[];
    isLoading: boolean;
    error: Error;
    hasSearched: boolean;
}

export default function TracksResult({ tracks }: TracksResultProps) {
  const [addToListModalOpen, setAddToListModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackWithReview | null>(null);

  const menuItems: MenuProps['items'] = [
    {
      key: 'add-to-list',
      label: (
        <span onClick={() => setAddToListModalOpen(true)}>
          Adicionar à lista
        </span>
      ),
    },
  ];

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
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
            arrow
            onOpenChange={(open: boolean) => {
              if (open) setSelectedTrack(track);
            }}
          >
            <span style={{ cursor: 'pointer' }} onClick={e => e.stopPropagation()}>
              <DotsThree size={22} />
            </span>
          </Dropdown>
        </div>
      ))}
      <AddListModal
        open={addToListModalOpen}
        onClose={() => setAddToListModalOpen(false)}
        itemId={selectedTrack?.id || null}
      />
    </div>
  )
}
