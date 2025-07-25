import AddListModal from "@/app/components/list/addListModal/addListModal";
import { ArtistItem } from "@/types/search";
import { Carousel } from "antd";
import { useState } from "react";
import ArtistResultItem from "./artistResultItem/artistResultItem";
import styles from "./styles.module.scss";

export default function ArtistsResult({ artists }: { artists: ArtistItem[] }) {
  const [addToListModalOpen, setAddToListModalOpen] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

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
          <ArtistResultItem
            key={artist.id}
            artist={artist}
            setAddToListModalOpen={setAddToListModalOpen}
            setSelectedArtistId={setSelectedArtistId}
          />
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
