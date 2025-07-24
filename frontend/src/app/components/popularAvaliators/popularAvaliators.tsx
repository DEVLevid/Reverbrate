import React from 'react'
import styles from './styles.module.scss'
import { useRankings } from '@/app/hooks/useRankings'
import { UserRanking } from '@/types/rankings';
import Image from 'next/image';

export default function PopularAvaliators() {
    const { getUserRankings } = useRankings();
    const { data, isLoading, isError } = getUserRankings;

    if (isLoading) {
        return <div>Carregando avaliadores...</div>;
    }

    if (isError) {
        return <div>Erro ao carregar avaliadores.</div>;
    }
    
    const avaliators = data?.data || [];

    return (
        <div>
            <div className={styles.title}>
                <h2>Avaliadores Populares</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.avaliators}>
                  {avaliators.map((user: UserRanking) => (
                    <div className={styles.avaliator} key={user.id}>
                        <div className={styles.avaliatorAvatar}><Image src={user.image} alt={user.name} width={50} height={50} /></div>
                        <div className={styles.avaliatorInfo}>
                            <h3>{user.name}</h3>
                            <div className={styles.avaliatorStats}>
                                <span>{user.lists_count} {user.lists_count === 1 ? 'Lista' : 'Listas'}</span>
                                <span>•</span>
                                <span>{user.reviews_count} {user.reviews_count === 1 ? 'Review' : 'Reviews'}</span>
                            </div>
                        </div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    )
}

