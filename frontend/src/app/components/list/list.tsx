"use client";

import React, { useState } from "react";
import CardList from "./cardList/cardList";
import styles from "./styles.module.scss";
import { List as ListType } from "@/types/lists";
import { PlusIcon } from "@phosphor-icons/react";
import AddList from "./addList/addList";
import { Button } from "antd";

export interface ListProps {
  title: string;
  lists: ListType[];
}

export default function List({ title, lists }: ListProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <h3>{title}</h3>
        <Button
          className={styles.addListButton}
          onClick={() => setOpen(true)}
          icon={<PlusIcon size={24} color="white" />}
        ></Button>
        <AddList open={open} onCancel={() => setOpen(false)} />
      </div>
      <div className={styles.wrapper}>
        {lists?.map((list) => (
          <CardList
            key={list.id}
            listName={list.name}
            userName={list.created_by.name}
            listType={list.type}
          />
        ))}
      </div>
    </div>
  );
}
