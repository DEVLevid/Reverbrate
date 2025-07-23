import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  DotsThreeVertical,
  MusicNoteSimple,
  Playlist,
  PencilSimple,
  Trash,
  Heart,
} from "@phosphor-icons/react/ssr";
import { Dropdown, MenuProps, message } from "antd";
import { List } from "@/types/lists";
import { useLists } from "@/app/hooks/useLists";
import { useQueryClient } from "@tanstack/react-query";
import { HeartIcon } from "@phosphor-icons/react";

interface CardListProps {
  list: List;
  openModal: (list: List) => void;
  enableLikeButton: boolean;
}

export default function CardList({
  list,
  openModal,
  enableLikeButton,
}: CardListProps) {
  const { deleteListMutation, likeListMutation } = useLists();
  const queryClient = useQueryClient();
  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const onClick: MenuProps["onClick"] = (props: { key: string }) => {
    if (props.key === "edit") {
      openModal(list);
    } else if (props.key === "delete") {
      deleteListMutation.mutate(list.id, {
        onSuccess: () => {
          message.success("Lista deletada com sucesso");
          queryClient.invalidateQueries({ queryKey: ["lists"] });
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      });
    }
  };

  const likeList = async (id: string) => {
    if (list.is_liked) {
      await likeListMutation.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["lists"] });
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      });
    } else {
      await likeListMutation.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["lists"] });
          queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
      });
    }
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
        >
          <Trash size={16} /> Excluir
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.nameAndIconContainer}>
        <Playlist size={32} />
        <div className={styles.listContent}>
          <h3>{truncateText(list.name)}</h3>
          <p>por {list.created_by.name}</p>
        </div>
      </div>

      <div className={styles.listAndMenuContainer}>
        <div className={styles.listType}>
          <MusicNoteSimple size={12} />
          <p>{list.type}</p>
        </div>
        {enableLikeButton && (
          <div className={styles.likeButton}>
            {list.is_liked ? (
              <div onClick={() => likeList(list.id)}>
                <HeartIcon weight="fill" color="#FF1E00" size={24} />
              </div>
            ) : (
              <div onClick={() => likeList(list.id)}>
                <HeartIcon size={24} />
              </div>
            )}
          </div>
        )}
        <div className={styles.menuIcon}>
          <Dropdown
            menu={{ items: menuItems, onClick: onClick }}
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
      </div>
    </div>
  );
}
