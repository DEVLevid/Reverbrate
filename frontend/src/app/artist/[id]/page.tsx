"use client";

import NavBar from "@/app/components/navBar/navBar";
import { useArtist } from "@/app/hooks/useArtist";
import styles from "./styles.module.scss";
import Image from "next/image";
import MusicItem from "@/app/components/musicItem/musicItem";
import { TrackWithReview } from "@/types/search";
import { useParams } from "next/navigation";

export default function ArtistPage() {
    const { id } = useParams() as { id: string };
    const { getArtist } = useArtist();
    const { data: artist, isLoading, isError } = getArtist(id);

    return (
        <>
            <NavBar />
            <main className={styles.mainContainer}>
                {isError ?
                    <p>Não foi possível encontrar informações desse artista...</p>
                    : isLoading ?
                        <p>Carregando...</p>
                        : <section className={styles.artistContainer}>
                            <div className={styles.artistHeader}>
                                <Image className={styles.artistImage} src={artist!.cover} alt="" width={128} height={128} />
                                <div className={styles.artistHeaderWrapper}>
                                    <span>Artista</span>
                                    <h1>{artist!.name}</h1>
                                </div>
                            </div>
                            <div className={styles.artistTracksContainer}>
                                <h3 className={styles.musicListTitle}>Músicas</h3>
                                <ul className={styles.musicList}>
                                    {
                                        artist!.tracks.map((track) => {
                                            const trackWithReview: TrackWithReview = {
                                                artist_name: artist!.name,
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
                                                <MusicItem key={track.id} track={trackWithReview} ommitArtist />
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