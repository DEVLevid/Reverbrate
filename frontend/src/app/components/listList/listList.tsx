import { List, ListsResponse } from "@/types/lists";
import { Button, Pagination } from "antd";
import { useState } from "react";
import CardList from "../list/cardList/cardList";
import styles from "./styles.module.scss";
import { PlusIcon } from "@phosphor-icons/react";
import ListModal from "../list/listModal/listModal";

interface ListListProps {
  title: string;
  lists: ListsResponse;
  enableLikeButton: boolean;
  enableCreateButton: boolean;
}

export default function ListList({
  title,
  lists,
  enableLikeButton,
  enableCreateButton,
}: ListListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<List | null>(null);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentLists = lists.data.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <h3>{title}</h3>
        {enableCreateButton && (
          <Button
            className={styles.addListButton}
            onClick={() => setOpen(true)}
            icon={<PlusIcon size={24} color="white" />}
          ></Button>
        )}
        <ListModal
          open={open}
          onCancel={() => setOpen(false)}
          initialValues={list ?? undefined}
        />
      </div>
      <div className={styles.wrapper}>
        {currentLists.length <= 0 ? (
          <i className={styles.noLists}>Você ainda não possui listas...</i>
        ) : (
          currentLists.map((list) => {
            return (
              <CardList
                key={list.id}
                list={list}
                openModal={(list) => {
                  setList(list);
                  setOpen(true);
                }}
                enableLikeButton={enableLikeButton}
              />
            );
          })
        )}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={lists.total}
        onChange={handlePageChange}
        className={styles.listPagination}
      />
    </div>
  );
}
