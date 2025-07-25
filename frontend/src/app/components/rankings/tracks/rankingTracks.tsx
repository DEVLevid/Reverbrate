import React from 'react'
import styles from './styles.module.scss'
import { StarSelector } from '../../base/starSelector/starSelector'
import Image from 'next/image';
import { DotsThree, User } from '@phosphor-icons/react/dist/ssr';
import { useRankingTracks } from '@/app/hooks/useRankingTracks';
import { top5Tracks } from '@/infra/mock/ranking/tracks';
import RankingTracksSkeleton from './rankingTracksSkeleton';
import AddListModal from '../../list/addListModal/addListModal';
import { useState } from 'react';
import { Dropdown } from 'antd';

export default function RankingTracks() {
    const { fetchRankingTracks } = useRankingTracks();
    const { data, isLoading } = fetchRankingTracks();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

    const handleOpenModal = (trackId: string) => {
        setSelectedTrackId(trackId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedTrackId(null);
    };

    if (isLoading) {
        return <RankingTracksSkeleton />;
    }

    const tracks = data?.data || top5Tracks;

    const menuItems = [
        {
            key: 'add-to-list',
            label: (
                <span onClick={() => setModalOpen(true)}>
                    Adicionar à lista
                </span>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Top 5 Músicas</h2>
            </div>
            <div className={styles.tracks}>
                {tracks.map((track) => (
                    <div className={styles.trackContainer} key={track.track_info.id}>
                        <div className={styles.trackInfo}>
                            <div className={styles.trackCover}>
                                <Image src={track.track_info.cover} alt={track.track_info.name} width={50} height={50} />
                            </div>
                            <div className={styles.trackNameContainer}>
                                <div className={styles.trackName}>
                                    <h3>{track.track_info.name}</h3>
                                    <span>-</span>
                                    <p>{track.track_info.artist}</p>
                                </div>
                                <StarSelector rating={track.rate} setRating={() => { }} disabled size={16} />
                            </div>
                        </div>
                        <div className={styles.trackActions}>
                            <div className={styles.usersReview}>
                                {track.network.slice(0, 3).map((reviewUser, idx) => (
                                    <div className={styles.userProfile} key={reviewUser.created_by.id || idx}>
                                        {reviewUser.created_by.image ? (
                                            <Image
                                                src={reviewUser.created_by.image}
                                                alt={reviewUser.created_by.name}
                                                width={20}
                                                height={20}
                                                style={{ borderRadius: '50%' }}
                                            />
                                        ) : (
                                            <User size={20} />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.iconContainer}>
                                <Dropdown
                                    menu={{ items: [
                                        {
                                            key: 'add-to-list',
                                            label: (
                                                <span onClick={() => handleOpenModal(track.track_info.id)}>
                                                    Adicionar à lista
                                                </span>
                                            ),
                                        },
                                    ] }}
                                    trigger={["click"]}
                                    placement="bottomRight"
                                    arrow
                                >
                                    <span style={{ cursor: 'pointer' }}>
                                        <DotsThree size={22} />
                                    </span>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AddListModal open={modalOpen} onClose={handleCloseModal} itemId={selectedTrackId} />
        </div>
    )
}
