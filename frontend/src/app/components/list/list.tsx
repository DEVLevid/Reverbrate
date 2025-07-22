"use client";

import React, { useState } from "react";
import CardList from "./cardList/cardList";
import styles from "./styles.module.scss";
import { List as ListType } from "@/types/lists";
import { PlusIcon } from "@phosphor-icons/react";
import AddList from "./addList/addList";
import { Pagination } from "antd";

export interface ListProps {
  title: string | undefined;
  lists: ListType[];
}

export default function List({ title, lists }: ListProps) {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentLists = lists.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <h3>{title}</h3>
        <div
          className={styles.addBtn}
          onClick={() => setOpen(true)}>
            <PlusIcon size={24} color="white" />
        </div>
        <AddList open={open} onCancel={() => setOpen(false)} />
      </div>
      <div className={styles.wrapper}>
        {currentLists.length <= 0 ? (
          <i className={styles.noLists}>Você ainda não possui listas...</i>
        ) : (
          currentLists.map((list) => (
            <CardList
              key={list.id}
              listName={list.name}
              userName={list.created_by.name}
              listType={list.type}
              listId={list.id}
            />
          ))
        )}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={lists.length}
        onChange={handlePageChange}
        className={styles.listPagination}
      />
    </div>
  );
}
