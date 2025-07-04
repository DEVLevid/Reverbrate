import { usePlayerContext } from "../contexts/PlayerContext";

export const usePlayer = () => {
  const { currentTrack, playTrack } = usePlayerContext();
  console.log(currentTrack);
  return { currentTrack, playTrack };
};
