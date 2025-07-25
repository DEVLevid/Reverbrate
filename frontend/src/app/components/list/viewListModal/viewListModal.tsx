import { useLists } from "@/app/hooks/useLists";
import { List } from "@/types/lists";
import { AlbumItem, ArtistItem, TrackWithReview } from "@/types/search";
import { Modal, Spin } from "antd";
import MusicItem from "../../musicItem/musicItem";
import AlbumResultItem from "../../search/searchResult/albumResult/albumResultItem/albumResultItem";
import ArtistResultItem from "../../search/searchResult/artistResult/artistResultItem/artistResultItem";
import styles from "./styles.module.scss";

interface ViewListModalProps {
  open: boolean;
  onClose: () => void;
  listId: string;
}

export default function ViewListModal({
  open,
  onClose,
  listId,
}: ViewListModalProps) {
  const { fetchListById } = useLists();
  const { data: list, isLoading } = fetchListById(listId);

  const renderList = (list: List) => {
    if (list.items.length <= 0) {
      return (
        <p className={styles.emptyListText}>
          Essa lista ainda não possui nenhum item.
        </p>
      );
    }
    switch (list.type) {
      case "artist":
        return (
          <div className={styles.artistWrapper}>
            {list.items.map((item) => {
              return (
                <ArtistResultItem
                  key={item.id}
                  artist={item as ArtistItem}
                  setAddToListModalOpen={() => {}}
                  setSelectedArtistId={() => {}}
                />
              );
            })}
          </div>
        );
      case "track":
        return (
          <div className={styles.trackWrapper}>
            {list.items.map((item) => {
              return (
                <MusicItem
                  key={item.id}
                  track={item as TrackWithReview}
                  variant="secondary"
                />
              );
            })}
          </div>
        );
      case "album":
        return (
          <div className={styles.albumWrapper}>
            {list.items.map((item) => {
              return (
                <AlbumResultItem
                  key={item.id}
                  album={item as AlbumItem}
                  setAddToListModalOpen={() => {}}
                  setSelectedAlbumId={() => {}}
                />
              );
            })}
          </div>
        );
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={list ? list?.name : "Suas Listas"}
      footer={null}
      className={styles.customModal}
    >
      {isLoading ? <Spin /> : list && renderList(list)}
    </Modal>
  );
}
