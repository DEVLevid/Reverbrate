"use client"

import React from 'react'
import styles from './searchBar.module.scss';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>
          <MagnifyingGlass size={22} />
        </span>
        <input
          type="text"
          className={styles.input}
        />
      </div>
    </div>
  )
}
