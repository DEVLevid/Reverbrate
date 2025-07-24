"use client";

import MusicItem from "@/app/components/musicItem/musicItem";
import NavBar from "@/app/components/navBar/navBar";
import { useAlbum } from "@/app/hooks/useAlbum";
import { TrackWithReview } from "@/types/search";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "./styles.module.scss";
import { Spin } from "antd";

export default function ArtistPage() {
  const { id } = useParams() as { id: string };
  const { getAlbum } = useAlbum();
  const { data: album, isLoading, isError, isFetching } = getAlbum(id);

  if (isError || !album) {
    return <p>Não foi possível encontrar informações desse album...</p>;
  }

  if (isLoading || isFetching) {
    return (
      <div className={styles.loadingContainer}>
        <Spin />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <main className={styles.mainContainer}>
        <section className={styles.artistContainer}>
          <div className={styles.artistHeader}>
            <Image
              className={styles.artistImage}
              src={album.cover}
              alt=""
              width={128}
              height={128}
            />
            <div className={styles.artistHeaderWrapper}>
              <span>Álbum</span>
              <h1>{album.name}</h1>
              <span>{album.artist_name}</span>
            </div>
          </div>
          <div className={styles.artistTracksContainer}>
            <h3 className={styles.musicListTitle}>Músicas</h3>
            <ul className={styles.musicList}>
              {album.tracks.map((track: TrackWithReview) => {
                return <MusicItem key={track.id} track={track} />;
              })}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
