import React from "react";
import styles from "./styles.module.scss";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import List from "@/app/components/list/list";

export default function ListContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.titleContaienr}>
        <h1 className={styles.title}>Listas</h1>
        <Plus size={32} />
      </div>
      <List />
    </div>
  );
}
