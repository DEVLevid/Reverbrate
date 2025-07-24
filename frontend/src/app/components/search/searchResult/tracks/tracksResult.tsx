import AddListModal from "@/app/components/list/addListModal/addListModal";
import MusicItem from "@/app/components/musicItem/musicItem";
import { TrackWithReview } from "@/types/search";
import { useState } from "react";
import styles from "./styles.module.scss";

interface TracksResultProps {
  tracks: TrackWithReview[];
  isLoading: boolean;
  error: Error;
  hasSearched: boolean;
}

export default function TracksResult({ tracks }: TracksResultProps) {
  const [addToListModalOpen, setAddToListModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackWithReview | null>(
    null
  );

  return (
    <div className={styles.trackList}>
      {tracks.map((track) => (
        <MusicItem key={track.id} track={track} />
      ))}
      <AddListModal
        open={addToListModalOpen}
        onClose={() => setAddToListModalOpen(false)}
        itemId={selectedTrack?.id || null}
      />
    </div>
  );
}
