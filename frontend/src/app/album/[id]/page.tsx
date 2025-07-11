"use client";

import MusicItem from "@/app/components/musicItem/musicItem";
import NavBar from "@/app/components/navBar/navBar";
import { useAlbum } from "@/app/hooks/useAlbum";
import { TrackWithReview } from "@/types/search";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "./styles.module.scss";

export default function ArtistPage() {
    const { id } = useParams() as { id: string };
    const { getAlbum } = useAlbum();
    const { data: album, isLoading, isError } = getAlbum(id);

    return (
        <>
            <NavBar />
            <main className={styles.mainContainer}>
                {isError ?
                    <p>Não foi possível encontrar informações desse album...</p>
                    : isLoading ?
                        <p>Carregando...</p>
                        : <section className={styles.artistContainer}>
                            <div className={styles.artistHeader}>
                                <Image className={styles.artistImage} src={album!.cover} alt="" width={128} height={128} />
                                <div className={styles.artistHeaderWrapper}>
                                    <span>Álbum</span>
                                    <h1>{album!.name}</h1>
                                    <span>{album!.artist_name}</span>
                                </div>
                            </div>
                            <div className={styles.artistTracksContainer}>
                                <h3 className={styles.musicListTitle}>Músicas</h3>
                                <ul className={styles.musicList}>
                                    {
                                        album!.tracks.map((track) => {
                                            const trackWithReview: TrackWithReview = {
                                                artist_name: track.artist,
                                                cover: track.cover,
                                                id: track.id,
                                                name: track.name,
                                                uri: track.uri,
                                                type: "track",
                                                review: {
                                                    rate: track.review?.rate,
                                                    comment: track.review?.comment,
                                                    created_at: "",
                                                    updated_at: ""
                                                }
                                            }
                                            return (
                                                <MusicItem key={track.id} track={trackWithReview} />
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </section>}
            </main>
        </>
    )
}