"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TracksApi } from "@/infra/api/tracks";
import { TrackWithReview } from "@/types/search";
import Player from "../components/player/player";
import styles from "@/styles/playerProvider.module.scss";

export interface TrackToPlay {
  uri: string;
  name: string;
  artists: { name: string; uri: string }[];
  album: {
    name: string;
    images: { url: string }[];
    uri: string;
  };
}

interface PlayerContextProps {
  currentTrack: TrackToPlay | null;
  currentReview: TrackWithReview | null;
  playTrack: (id: string) => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

export const PlayerContext = createContext<PlayerContextProps | undefined>(
  undefined
);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<TrackToPlay | null>(null);
  const [currentReview, setCurrentReview] = useState<TrackWithReview | null>(
    null
  );
  const [trackId, setTrackId] = useState<string | null>(null);

  const { data: track } = useQuery({
    queryKey: ["tracks", trackId],
    queryFn: () => (trackId ? TracksApi.getTrack(trackId) : null),
    enabled: !!trackId,
  });

  const { data: nextTrackData, refetch: refetchNextTrack } = useQuery({
    queryKey: ["tracks", trackId, "next"],
    queryFn: () => (trackId ? TracksApi.getNextTrack(trackId) : null),
    enabled: false,
  });

  const { data: previousTrackData, refetch: refetchPreviousTrack } = useQuery({
    queryKey: ["tracks", trackId, "previous"],
    queryFn: () => (trackId ? TracksApi.getPreviousTrack(trackId) : null),
    enabled: false,
  });

  const playTrack = (id: string) => {
    setTrackId(id);
  };

  const nextTrack = async () => {
    if (trackId) {
      const { data } = await refetchNextTrack();
      if (data) {
        setTrackId(data.id);
      }
    }
  };

  const previousTrack = async () => {
    if (trackId) {
      const { data } = await refetchPreviousTrack();
      if (data) {
        setTrackId(data.id);
      }
    }
  };

  useEffect(() => {
    if (track) {
      setCurrentTrack({
        uri: track.uri,
        name: track.name,
        artists: [{ name: track.artist_name, uri: track.artist_uri }],
        album: {
          name: track.album_name,
          images: [{ url: track.cover }],
          uri: track.album_uri,
        },
      });
      setCurrentReview(track);
    }
  }, [track]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        currentReview,
        playTrack,
        nextTrack,
        previousTrack,
      }}
    >
      <div className={styles.providerContainer}>{children}</div>
      {currentTrack && currentReview && (
        <Player currentTrack={currentTrack} review={currentReview} />
      )}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
}
