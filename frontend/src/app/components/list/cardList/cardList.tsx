import { useLists } from "@/app/hooks/useLists";
import { ListType } from "@/types/lists";
import {
  DotsThreeVertical,
  MusicNoteSimple,
  PencilSimple,
  Playlist,
  Trash,
} from "@phosphor-icons/react/ssr";
import { Dropdown } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ViewListModal from "../viewListModal/viewListModal";
import AddList from "../listForm/listForm";
import styles from "./styles.module.scss";
interface CardListProps {
  listName: string;
  userName: string;
  listType: ListType;
  listId: string;
  isEditable?: boolean;
}

export default function CardList({
  listName,
  userName,
  listType,
  listId,
  isEditable = false,
}: CardListProps) {
  const [ViewListModalOpen, setViewListModalOpen] = useState(false);
  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const { deleteListMutation } = useLists();

  const handleDeleteList = async (listId: string) => {
    await deleteListMutation.mutateAsync(listId, {
      onSuccess: () => {
        toast.success("Lista deletada com sucesso");
      },
      onError: () => {
        toast.error("Erro ao deletar lista");
      },
    });
  };

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const menuItems = [
    {
      key: "edit",
      label: (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#010101",
          }}
          onClick={handleEdit}
        >
          <PencilSimple size={16} /> Editar
        </span>
      ),
    },
    {
      key: "delete",
      label: (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#010101",
          }}
          onClick={async () => await handleDeleteList(listId)}
        >
          <Trash size={16} /> Excluir
        </span>
      ),
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.nameAndIconContainer}>
          <Playlist size={32} />
          <div className={styles.listContent}>
            <h3 onClick={() => setViewListModalOpen(true)}>
              {truncateText(listName)}
            </h3>
            <p>por {userName}</p>
          </div>
        </div>

        <div className={styles.listAndMenuContainer}>
          <div className={styles.listType}>
            <MusicNoteSimple size={12} />
            <p>{listType}</p>
          </div>
          {isEditable && (
            <div className={styles.menuIcon}>
              <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}
                placement="bottomRight"
                arrow
                popupRender={(menu: React.ReactNode) => <div>{menu}</div>}
                className={styles.dropdown}
              >
                <span style={{ cursor: "pointer" }}>
                  <DotsThreeVertical size={22} />
                </span>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
      <AddList
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        initialName={listName}
        initialType={listType}
        listId={listId}
        mode="edit"
      />
      <ViewListModal
        open={ViewListModalOpen}
        onClose={() => setViewListModalOpen(false)}
        listId={listId}
      />
    </>
  );
}
