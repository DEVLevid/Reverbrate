'use client'

import React from 'react'
import styles from './styles.module.scss';
import { mockLists } from '@/infra/mock/lists/listMock';
import CardList from './cardList/cardlist';

export default function List() {
  const firstFourLists = mockLists.slice(0, 4);
  return (
    <div className={styles.container}>
      {firstFourLists.map((list) => (
        <CardList
          key={list.id}
          listName={list.name}
          userName="Levid" 
          listType={list.type}
        />
      ))}
    </div>
  )
}
