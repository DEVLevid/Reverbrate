"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import BaseModal from "../base/modal/baseModal";
import PlayerControls from "./playerControls/PlayerControls";
import PlayerMusicInfo from "./playerMusicInfo/PlayerMusicInfo";
import PlayerMusicReview from "./playerReviewMusic/PlayerReviewMusic";
import { useSpotifyPlayer } from "@/app/hooks/useSpotifyPlayer";
import { TrackToPlay } from "@/app/contexts/PlayerContext";
import { TrackWithReview } from "@/types/search";

function Player({
  currentTrack,
  review,
}: {
  currentTrack: TrackToPlay;
  review: TrackWithReview;
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [token, setToken] = useState<string | undefined>("");
  const { tokenMutation } = useAuth();
  useEffect(() => {
    tokenMutation.mutate(undefined, {
      onSuccess: (data) => {
        setToken(data.access_token);
      },
    });
  }, []);

  const { state, isConnected, showPlayer, dispatch } = useSpotifyPlayer({
    token,
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <article
      className={`${styles.playerContainer} ${
        showPlayer ? styles.showPlayer : styles.hidePlayer
      }`}
      onClick={(e) => {
        e.preventDefault();
        if (!state.current_track.name && !isModalOpen) {
          setIsModalOpen(true);
        }
      }}
    >
      {isConnected && (
        <BaseModal
          open={isModalOpen && !state.current_track.name}
          title="Selecione o dispositivo"
          onCancel={handleModalClose}
          footer={null}
        >
          <div
            className={styles.connectModalWrapper}
            onClick={handleModalClose}
          >
            <div className={styles.connectModalChildren}>
              <span>1. Abra o app do Spotify</span>
            </div>
            <div className={styles.connectModalChildren}>
              <span>2. Clique no ícone</span>
              <Image
                src="spotifyDevice.svg"
                alt={"icone de dispositivo no spotify"}
                width={24}
                height={24}
              />
            </div>
            <div className={styles.connectModalChildren}>
              <span>
                3. Selecione o dispositivo chamado &quot;Reverbrate Player&quot;
              </span>
            </div>
          </div>
        </BaseModal>
      )}

      {isConnected && state.current_track.name && (
        <>
          <PlayerMusicInfo
            title={state.current_track.name}
            artists={state.current_track.artists}
            album={state.current_track.album}
            track={review}
          />
          <PlayerControls
            progress={state.progress}
            duration={state.duration}
            dispatchFn={dispatch}
            player={state.player}
            isPaused={state.is_paused}
            track={review}
          />
          <PlayerMusicReview track={review} />
        </>
      )}
    </article>
  );
}

export default Player;
