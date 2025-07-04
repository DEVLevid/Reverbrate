import React, { createContext, useContext, useState } from "react";
import { TrackWithReview } from "@/types/search";

const initialPlayerState = {
  is_paused: true,
  is_active: false,
  player: undefined,
  current_track: {
    name: "",
    artists: [],
    album: {
      name: "",
      images: [],
    },
  },
  progress: 0,
  duration: 0,
};

interface PlayerContextProps {
  currentTrack: TrackWithReview | null;
  playTrack: (track: TrackWithReview) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<TrackWithReview | null>(
    null
  );

  const playTrack = (track: TrackWithReview) => {
    setCurrentTrack(track);
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, playTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
};
