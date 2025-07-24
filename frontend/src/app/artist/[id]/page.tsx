"use client";

import NavBar from "@/app/components/navBar/navBar";
import { useArtist } from "@/app/hooks/useArtist";
import styles from "./styles.module.scss";
import Image from "next/image";
import MusicItem from "@/app/components/musicItem/musicItem";
import { TrackWithReview } from "@/types/search";
import { useParams } from "next/navigation";
import { Spin } from "antd";

export default function ArtistPage() {
  const { id } = useParams() as { id: string };
  const { getArtist } = useArtist();
  const { data: artist, isLoading, isError, isFetching } = getArtist(id);

  if (isError || !artist) {
    return <p>Não foi possível encontrar informações desse artista...</p>;
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
              src={artist!.cover}
              alt=""
              width={128}
              height={128}
            />
            <div className={styles.artistHeaderWrapper}>
              <span>Artista</span>
              <h1>{artist!.name}</h1>
            </div>
          </div>
          <div className={styles.artistTracksContainer}>
            <h3 className={styles.musicListTitle}>Músicas</h3>
            <ul className={styles.musicList}>
              {artist!.tracks.map((track: TrackWithReview) => {
                return <MusicItem key={track.id} track={track} />;
              })}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
