import { AlbumItem } from "@/types/search";
import styles from "./styles.module.scss";
import React from "react";
import { Carousel } from "antd";
import { DotsThreeVertical } from "@phosphor-icons/react/dist/ssr";
import AddListModal from "@/app/components/list/addListModal/addListModal";
import { useState } from "react";
import { Dropdown, MenuProps } from "antd";
import { redirect } from "next/navigation";

export default function AlbumsResult({ albums }: { albums: AlbumItem[] }) {
  const [addToListModalOpen, setAddToListModalOpen] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

  const menuItems: MenuProps['items'] = [
    {
      key: 'add-to-list',
      label: (
        <span onClick={() => setAddToListModalOpen(true)}>
          Adicionar à lista
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h3>Álbuns</h3>
      <Carousel
        dots={false}
        arrows={true}
        slidesToShow={4}
        slidesToScroll={1}
        infinite={false}
        className={styles.albumList}
      >
        {albums.map((album) => (
          <div key={album.id} className={styles.albumItem} onClick={() => redirect(`/album/${album.id}`)}>
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
                      <div className={styles.icon} onClick={e => e.stopPropagation()}>
                        <DotsThreeVertical size={32} color="white" />
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
        ))}
      </Carousel>
      <AddListModal
        open={addToListModalOpen}
        onClose={() => setAddToListModalOpen(false)}
        itemId={selectedAlbumId}
      />
    </div>
  );
}
