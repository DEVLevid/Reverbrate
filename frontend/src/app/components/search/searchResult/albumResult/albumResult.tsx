import { AlbumItem } from "@/types/search";
import styles from "./styles.module.scss";
import React from "react";
import { Carousel } from "antd";
import { DotsThreeVertical } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

export default function AlbumsResult({ albums }: { albums: AlbumItem[] }) {
  const router = useRouter();
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
          <div key={album.id} className={styles.albumItem} onClick={() => {
            router.push(`/album/${album.id}`);
          }}>
            <div className={styles.coverContainer}>
              {album.cover ? (
                <>
                  <div className={styles.coverMenuContainer}>
                    <img
                      src={album.cover}
                      alt={album.name}
                      className={styles.albumCover}
                    />
                    <div className={styles.icon}>
                      <DotsThreeVertical size={32} color="white" />
                    </div>
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
    </div>
  );
}
