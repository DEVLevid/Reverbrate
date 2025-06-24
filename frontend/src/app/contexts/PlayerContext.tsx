import React, { createContext, useContext, useState } from 'react';

export interface TrackToPlay {
  uri: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
}

interface PlayerContextProps {
  currentTrack: TrackToPlay | null;
  playTrack: (track: TrackToPlay) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<TrackToPlay | null>(null);

  const playTrack = (track: TrackToPlay) => {
    setCurrentTrack(track);
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, playTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
}; 