import React from 'react'
import styles from './styles.module.scss';
import { DotsThreeVertical, MusicNoteSimple, Playlist } from '@phosphor-icons/react/ssr';

interface CardListProps {
  listName: string;
  userName: string;
  listType: string;
}

export default function CardList({ listName, userName, listType }: CardListProps) {
  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className={styles.container}>
      <div className={styles.nameAndIconContainer}>
        <Playlist size={32} />
        <div className={styles.listContent}>
          <h3>{truncateText(listName)}</h3>
          <p>por {userName}</p>
        </div>
      </div>

      <div className={styles.listAndMenuContainer}>
        <div className={styles.listType}>
          <MusicNoteSimple size={12} />
          <p>{listType}</p>
        </div>
        <div className={styles.menuIcon}>
          <DotsThreeVertical size={22} />
        </div>
      </div>
    </div>
  )
}
