import React from 'react'
import styles from './styles.module.scss'
import { UserSquare } from '@phosphor-icons/react/dist/ssr'
import { avaliatorsMock } from '@/infra/mock/avaliators/avaliatorsMock'

export default function PopularAvaliators() {
    return (
        <>
            <div className={styles.title}>
                <h2>Avaliadores Populares</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.avaliators}>
                  {avaliatorsMock.map((user) => (
                    <div className={styles.avaliator} key={user.id}>
                        <div className={styles.avaliatorAvatar}><UserSquare size={50} color='black' /></div>
                        <div className={styles.avaliatorInfo}>
                            <h3>{user.name}</h3>
                            <div className={styles.avaliatorStats}>
                                <span>{user.musicas} músicas</span>
                                <span>{user.reviews} reviews</span>
                            </div>
                        </div>
                    </div>
                  ))}
                </div>
            </div>
        </>
    )
}

