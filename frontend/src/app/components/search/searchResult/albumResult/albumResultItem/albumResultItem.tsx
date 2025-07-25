import { AlbumItem } from "@/types/search";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { Dropdown, MenuProps } from "antd";
import { redirect } from "next/navigation";
import styles from "./styles.module.scss";

interface AlbumResultItemProps {
  album: AlbumItem;
  setSelectedAlbumId: (id: string) => void;
  setAddToListModalOpen: (open: true) => void;
}

export default function AlbumResultItem({
  album,
  setSelectedAlbumId,
  setAddToListModalOpen,
}: AlbumResultItemProps) {
  const menuItems: MenuProps["items"] = [
    {
      key: "add-to-list",
      label: (
        <span onClick={() => setAddToListModalOpen(true)}>
          Adicionar à lista
        </span>
      ),
    },
  ];

  return (
    <div
      key={album.id}
      className={styles.albumItem}
      onClick={() => redirect(`/album/${album.id}`)}
    >
      <div className={styles.coverContainer}>
        {album.cover ? (
          <>
            <div className={styles.coverMenuContainer}>
              <img
                src={album.cover}
                alt={album.name}
                className={styles.albumCover}
              />
              <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}
                placement="bottomRight"
                arrow
                onOpenChange={(open: boolean) => {
                  if (open) setSelectedAlbumId(album.id);
                }}
              >
                <div
                  className={styles.icon}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DotsThreeVerticalIcon size={32} color="white" />
                </div>
              </Dropdown>
            </div>
          </>
        ) : null}
      </div>
      <div className={styles.albumInfo}>
        <div className={styles.albumName}>{album.name}</div>
        <div className={styles.artistName}>{album.artist_name}</div>
      </div>
    </div>
  );
}
