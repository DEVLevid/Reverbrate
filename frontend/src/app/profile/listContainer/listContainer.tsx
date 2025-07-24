import React from "react";
import styles from "./styles.module.scss";
import { useLists } from "@/app/hooks/useLists";
import List from "../../components/list/list";

export default function ListContainer() {
  const { fetchLists } = useLists();
  const { data: list } = fetchLists();
  return (
    <div className={styles.container}>
      <List title='Listas' lists={list?.data ?? []} />
    </div>
  );
}
