import React from 'react'
import styles from './styles.module.scss';
import { ArtistItem } from '@/types/search';
import { Carousel } from 'antd';
import { DotsThreeVertical, User } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from 'next/navigation';
import AddListModal from "@/app/components/list/addListModal/addListModal";
import { useState } from "react";
import { Dropdown, MenuProps } from "antd";

export default function ArtistsResult({ artists }: { artists: ArtistItem[] }) {
  const [addToListModalOpen, setAddToListModalOpen] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const router = useRouter();

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
        <h3>Artistas</h3>
        <Carousel
          dots={false}
          arrows={true}
          slidesToShow={4}
          slidesToScroll={1}
          infinite={false}
          className={styles.artistList}
        >
          {artists.map((artist) => (
            <div key={artist.id} className={styles.artistItem}>
              {artist.cover ? (
                <div className={styles.coverMenuContainer}>
                  <img
                    src={artist.cover}
                    alt={artist.name}
                    className={styles.artistCover}
                  />
                  <Dropdown
                    menu={{ items: menuItems }}
                    trigger={["click"]}
                    placement="bottomRight"
                    arrow
                    onOpenChange={(open: boolean) => {
                      if (open) setSelectedArtistId(artist.id);
                    }}
                  >
                    <div className={styles.icon} onClick={e => e.stopPropagation()}>
                      <DotsThreeVertical size={32} color="#fff" />
                    </div>
                  </Dropdown>
                </div>
              ) : (
                <div className={styles.placeholderCover}>
                  <span className={styles.placeholderIcon}>
                    <User size={32} color="#fff" />
                  </span>
                </div>
              )}
              <div className={styles.info}>
                <h3 className={styles.name}>{artist.name}</h3>
              </div>
            </div>
          ))}
        </Carousel>
        <AddListModal
          open={addToListModalOpen}
          onClose={() => setAddToListModalOpen(false)}
          itemId={selectedArtistId}
        />
      </div>
    );
}