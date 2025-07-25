import { ArtistItem } from "@/types/search";
import { DotsThreeVerticalIcon, UserIcon } from "@phosphor-icons/react";
import { Dropdown, MenuProps } from "antd";
import { redirect } from "next/navigation";
import styles from "./styles.module.scss";

interface ArtistResultItemProps {
  artist: ArtistItem;
  setSelectedArtistId: (id: string) => void;
  setAddToListModalOpen: (open: true) => void;
}

export default function ArtistResultItem({
  artist,
  setSelectedArtistId,
  setAddToListModalOpen,
}: ArtistResultItemProps) {
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
      key={artist.id}
      className={styles.artistItem}
      onClick={() => redirect(`/artist/${artist.id}`)}
    >
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
            <div className={styles.icon} onClick={(e) => e.stopPropagation()}>
              <DotsThreeVerticalIcon size={32} color="#fff" />
            </div>
          </Dropdown>
        </div>
      ) : (
        <div className={styles.placeholderCover}>
          <span className={styles.placeholderIcon}>
            <UserIcon size={32} color="#fff" />
          </span>
        </div>
      )}
      <div className={styles.info}>
        <h3 className={styles.name}>{artist.name}</h3>
      </div>
    </div>
  );
}
