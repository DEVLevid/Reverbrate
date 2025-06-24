"use client"

import React from "react";
import styles from "./styles.module.scss";
import { Bell, House, User } from "@phosphor-icons/react";
import SearchBar from "../search/searchBar/searchBar";
import { useSearchContext } from "../../contexts/SearchContext";

export default function NavBar() {
  const { setSearchQuery } = useSearchContext();

  return (
    <nav className={styles.container}>
      <div className={styles.navItens}>
        <House size={32} />
        <SearchBar onSearch={setSearchQuery} />
        <Bell size={32} />
        <User size={32} />
      </div>
    </nav>
  );
}
