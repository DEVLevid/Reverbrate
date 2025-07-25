import React from 'react'
import styles from './styles.module.scss';
import CardList from '../../list/cardList/cardList';
import { top5Lists } from '@/infra/mock/ranking/lists';
import { ListType } from '@/types/lists';

export default function RankingLists() {
  return (
    <div className={styles.container}>
        <div className={styles.title}>
            <h2>Top 5 Listas</h2>
        </div>

        <div className={styles.lists}>
          {top5Lists.map((list, idx) => (
            <div className={styles.list} key={idx}>
              <CardList 
                listName={list.listName}
                userName={list.userName}
                listType={list.listType as ListType} listId={''}              />
            </div>
          ))}
        </div>
    </div>
  )
}
