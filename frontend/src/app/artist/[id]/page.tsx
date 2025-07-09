"use client";

import NavBar from "@/app/components/navBar/navBar";
import { useArtist } from "@/app/hooks/useArtist";
import styles from "./styles.module.scss";
import Image from "next/image";
import MusicItem from "@/app/components/musicItem/musicItem";
import { TrackWithReview } from "@/types/search";

interface ArtistPageProps {
    params: {
        id: string;
    }
}

export default function ArtistPage({ params }: ArtistPageProps) {
    const { getArtist } = useArtist();
    const { data: artist, isLoading, isError } = getArtist(params.id);

    console.log(artist)
    console.log(isLoading)
    console.log(isError)

    return (
        <>
            <NavBar />
            <main className={styles.artistContainer}>
                {isError ?
                    <p>Não foi possível encontrar informações desse artista...</p>
                    : isLoading ?
                        <p>Carregando...</p>
                        : <>
                            <div className={styles.artistHeader}>
                                <Image className={styles.artistImage} src={artist!.cover} alt="" width={128} height={128} />
                                <h1>{artist!.name}</h1>
                            </div>
                            <div className={styles.artistTracksContainer}>
                                <h3>Músicas</h3>
                                <ul className={styles.musicList}>
                                    {
                                        artist!.top_tracks.map((track) => {
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
                                                <MusicItem key={track.id} track={trackWithReview} />
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </>}
            </main>
        </>
    )
}