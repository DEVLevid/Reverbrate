"use client"

import React from "react";
import styles from "./navBar.module.scss";
import { Bell, House, User } from "@phosphor-icons/react";
import SearchBar from "../search/searchBar";

export default function NavBar() {
  return (
    <nav className={styles.container}>
      <div className={styles.navItens}>
        <House size={32} />
        <SearchBar />
        <Bell size={32} />
        <User size={32} />
      </div>
    </nav>
  );
}
