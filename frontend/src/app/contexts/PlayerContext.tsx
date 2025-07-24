import { createContext, useContext, useState, useEffect } from "react";
import Player from "../components/player/player";
import { TrackWithReview } from "@/types/search";
import { useQuery } from "@tanstack/react-query";
import { TracksApi } from "@/infra/api/tracks";

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
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

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

  const playTrack = (id: string) => {
    setTrackId(id);
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
    <PlayerContext.Provider value={{ currentTrack, currentReview, playTrack }}>
      {children}
      {currentTrack && currentReview && (
        <Player currentTrack={currentTrack} review={currentReview} />
      )}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
};
