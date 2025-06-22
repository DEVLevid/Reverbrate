"use client";

import styles from "./styles.module.scss";

import { useEffect, useReducer, useState } from "react";

import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import BaseModal from "../base/baseModal";
import PlayerControls from "./player-controls/PlayerControls";

import PlayerMusicInfo from "./player-music-info/PlayerMusicInfo";
import PlayerMusicReview from "./player-review-music/PlayerReviewMusic";

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

const playerReducer = (prevState, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      return { ...prevState, player: action.payload };
    case "SET_TRACK":
      return { ...prevState, current_track: action.payload };
    case "SET_PROGRESS":
      return { ...prevState, progress: action.payload };
    case "SET_DURATION":
      return { ...prevState, duration: action.payload };
    case "PAUSE":
      return { ...prevState, is_paused: true, is_active: false };
    case "PLAY":
      return { ...prevState, is_paused: false, is_active: true };
    case "TOGGLE_PAUSE":
      return { ...prevState, is_paused: !prevState.is_paused };
    case "SET_ACTIVE":
      return { ...prevState, is_active: action.payload };
    default:
      return prevState;
  }
};

function Player() {
  const [state, dispatch] = useReducer(playerReducer, initialPlayerState);

  const [isConnected, setIsConnected] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [token, setToken] = useState<string | undefined>("");

  const { tokenMutation } = useAuth();

  useEffect(() => {
    tokenMutation.mutate();

    const interval = setInterval(() => {
      tokenMutation.mutate();
    }, 55 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tokenMutation.isSuccess && tokenMutation.data?.access_token) {
      setToken(tokenMutation.data.access_token);
    }
  }, [tokenMutation.data, tokenMutation.isSuccess]);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Reverbrate Player",
        getOAuthToken: (cb: (token: string | undefined) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      player.addListener(
        "initialization_error",
        ({ message }: { message: string }) => {
          console.error("Falha ao inicializar o player:", message);
        }
      );
      player.addListener(
        "authentication_error",
        ({ message }: { message: string }) => {
          console.error(
            "Falha na autenticação:",
            message,
            "Verifique os escopos e a validade do token!"
          );
        }
      );
      player.addListener(
        "account_error",
        ({ message }: { message: string }) => {
          console.error(
            "Erro de conta:",
            message,
            "O usuário precisa de Spotify Premium?"
          );
        }
      );
      player.addListener(
        "playback_error",
        ({ message }: { message: string }) => {
          console.error("Erro de reprodução:", message);
        }
      );

      player.addListener("ready", ({ device_id }: { device_id: string }) => {
        console.log("Player CONECTADO! Device ID:", device_id);
        setIsConnected(true);
        setTimeout(() => setShowPlayer(true), 100);
      });

      player.addListener(
        "not_ready",
        ({ device_id }: { device_id: string }) => {
          console.log("Dispositivo desconectado", device_id);
          setIsConnected(false);
          setShowPlayer(false);
        }
      );

      player.addListener("player_state_changed", (playerState) => {
        if (!playerState) {
          return;
        }

        if (playerState.track_window.current_track.uri) {
          setIsModalOpen(false);
        }

        dispatch({
          type: "SET_TRACK",
          payload: playerState.track_window.current_track,
        });
        dispatch({ type: playerState.paused ? "PAUSE" : "PLAY" });
        dispatch({ type: "SET_PROGRESS", payload: playerState.position });
        dispatch({ type: "SET_DURATION", payload: playerState.duration });

        player.getCurrentState().then((playerState) => {
          dispatch({ type: "SET_ACTIVE", payload: !!playerState });
        });
      });

      player.connect().then((success) => {
        if (success) {
          console.log("A conexão com o Spotify Player foi bem-sucedida.");
          dispatch({ type: "SET_PLAYER", payload: player });
        } else {
          console.error("A conexão com o Spotify Player falhou.");
        }
      });

      return () => {
        window.onSpotifyWebPlaybackSDKReady = null;
      };
    };
  }, [token]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.is_active && !state.is_paused) {
      interval = setInterval(() => {
        dispatch({
          type: "SET_PROGRESS",
          payload: Math.min(state.progress + 1000, state.duration),
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.is_active, state.is_paused, state.progress, state.duration]);

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
          />
          <PlayerControls
            progress={state.progress}
            duration={state.duration}
            dispatchFn={dispatch}
            player={state.player}
            isPaused={state.is_paused}
          />
          <PlayerMusicReview />
        </>
      )}
    </article>
  );
}

export default Player;
