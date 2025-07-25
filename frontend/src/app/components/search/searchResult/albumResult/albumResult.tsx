import AddListModal from "@/app/components/list/addListModal/addListModal";
import { AlbumItem } from "@/types/search";
import { Carousel } from "antd";
import { useState } from "react";
import AlbumResultItem from "./albumResultItem/albumResultItem";
import styles from "./styles.module.scss";

export default function AlbumsResult({ albums }: { albums: AlbumItem[] }) {
  const [addToListModalOpen, setAddToListModalOpen] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

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
          <AlbumResultItem
            key={album.id}
            album={album}
            setAddToListModalOpen={setAddToListModalOpen}
            setSelectedAlbumId={setSelectedAlbumId}
          />
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
