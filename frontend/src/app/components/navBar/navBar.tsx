"use client"

import React from "react";
import styles from "./styles.module.scss";
import { Bell, House, User } from "@phosphor-icons/react";
import SearchBar from "../search/searchBar/searchBar";
import { useSearchContext } from "../../contexts/SearchContext";

export default function NavBar() {
  const { setSearchQuery } = useSearchContext();

  const handleHomeClick = () => {
    window.location.href = "/home";
  };

  const handleProfileClick = () => {
    window.location.href = "/profile";
  };

  return (
    <nav className={styles.container}>
      <div className={styles.navItens}>
        <button 
          onClick={handleHomeClick} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: "white",
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <House size={28} />
        </button>
        <SearchBar onSearch={setSearchQuery} />
        <Bell size={28} />
        <button 
          onClick={handleProfileClick} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: "white",
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <User size={28} />
        </button>
      </div>
    </nav>
  );
}
