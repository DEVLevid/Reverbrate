"use client"

import React, { useState } from 'react'
import styles from './searchBar.module.scss';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>
          <MagnifyingGlass size={22} />
        </span>
        <input
          type="text"
          className={styles.input}
          placeholder="Buscar músicas, artistas ou álbuns..."
          value={query}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}
