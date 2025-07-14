'use client'

import React from 'react'
import CardList from './cardList/cardlist';
import { useLists } from '@/app/hooks/useLists';
import { Spin } from 'antd';
import styles from './styles.module.scss';
export default function List() {
  const { fetchLists } = useLists();
  const { data, isLoading, error } = fetchLists();

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}><Spin size="large" /></div>;
  if (error) return <div>Erro ao carregar listas</div>;

  const lists = data?.data || [];

  return (
    <div className={styles.container}>
      {lists.map((list) => (
        <CardList
          key={list.id}
          listName={list.name}
          userName="Usuário" 
          listType={list.type}
        />
      ))}
    </div>
  )
}
