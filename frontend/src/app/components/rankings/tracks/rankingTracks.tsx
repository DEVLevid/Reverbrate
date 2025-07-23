import React from 'react'
import styles from './styles.module.scss'
import { top5Tracks } from '@/infra/mock/ranking/tracks'
import { StarSelector } from '../../base/starSelector/starSelector'
import Image from 'next/image';
import { DotsThree, User } from '@phosphor-icons/react/dist/ssr';

export default function RankingTracks() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Top 5 Músicas</h2>
            </div>
            <div className={styles.tracks}>
                {top5Tracks.map((track) => (
                    <div className={styles.trackContainer} key={track.id}>
                        <div className={styles.trackInfo}>
                            <div className={styles.trackCover}>
                                {/* <Image src={track.cover} alt={track.name} width={50} height={50} /> */}
                            </div>
                            <div className={styles.trackNameContainer}>
                                <div className={styles.trackName}>
                                    <h3>{track.name}</h3>
                                    <span>-</span>
                                    <p>{track.artist_name}</p>
                                </div>
                                <StarSelector rating={track.review.rate} setRating={() => { }} disabled size={16} />
                            </div>
                        </div>
                        <div className={styles.trackActions}>
                            <div className={styles.usersReview}>
                                <div className={styles.userProfile}><User size={20} /></div>
                                <div className={styles.userProfile}><User size={20} /></div>
                                <div className={styles.userProfile}><User size={20} /></div>
                            </div>
                            <div className={styles.iconContainer}>
                                <DotsThree size={22} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
