import { useEffect, useReducer, useState, useCallback } from "react";
import { TrackToPlay, usePlayer } from "../contexts/PlayerContext";

interface PlayerState {
  is_paused: boolean;
  is_active: boolean;
  player: any;
  current_track: TrackToPlay;
  progress: number;
  duration: number;
}

export type PlayerAction =
  | { type: "SET_PLAYER"; payload: any }
  | { type: "SET_TRACK"; payload: TrackToPlay }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "PAUSE" }
  | { type: "PLAY" }
  | { type: "TOGGLE_PAUSE" }
  | { type: "SET_ACTIVE"; payload: boolean };

const initialPlayerState: PlayerState = {
  is_paused: true,
  is_active: false,
  player: undefined,
  current_track: {
    name: "",
    artists: [],
    album: {
      name: "",
      images: [],
      uri: "",
    },
    uri: "",
  },
  progress: 0,
  duration: 0,
};

const playerReducer = (
  state: PlayerState,
  action: PlayerAction
): PlayerState => {
  switch (action.type) {
    case "SET_PLAYER":
      return { ...state, player: action.payload };
    case "SET_TRACK":
      return { ...state, current_track: action.payload };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "PAUSE":
      return { ...state, is_paused: true, is_active: false };
    case "PLAY":
      return { ...state, is_paused: false, is_active: true };
    case "TOGGLE_PAUSE":
      return { ...state, is_paused: !state.is_paused };
    case "SET_ACTIVE":
      return { ...state, is_active: action.payload };
    default:
      return state;
  }
};

interface UseSpotifyPlayerProps {
  token: string | undefined;
}

export function useSpotifyPlayer({ token }: UseSpotifyPlayerProps) {
  const [state, dispatch] = useReducer(playerReducer, initialPlayerState);
  const [isConnected, setIsConnected] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [deviceId, setDeviceId] = useState<string>("");
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_INTERVAL = 3000;
  const { currentTrack, nextTrack } = usePlayer();

  const checkSDKAvailable = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return typeof Spotify !== "undefined" && Spotify.Player;
  };

  const initializePlayer = useCallback(() => {
    if (!token) {
      return null;
    }

    if (!checkSDKAvailable()) {
      return null;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const player = new Spotify.Player({
        name: "Reverbrate Player",
        getOAuthToken: (cb: (token: string | undefined) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      if (!player) {
        return null;
      }

      const setupListeners = () => {
        player.addListener("ready", ({ device_id }: { device_id: string }) => {
          setIsConnected(true);
          setShowPlayer(true);
          setDeviceId(device_id);
          setReconnectAttempts(0);
          dispatch({ type: "SET_PLAYER", payload: player });
        });

        player.addListener(
          "not_ready",
          ({ device_id }: { device_id: string }) => {
            setIsConnected(false);
            setShowPlayer(false);
          }
        );

        player.addListener(
          "initialization_error",
          ({ message }: { message: string }) => {
            setIsConnected(false);
          }
        );

        player.addListener(
          "authentication_error",
          ({ message }: { message: string }) => {
            setIsConnected(false);
          }
        );

        player.addListener(
          "account_error",
          ({ message }: { message: string }) => {
            setIsConnected(false);
          }
        );

        player.addListener(
          "playback_error",
          ({ message }: { message: string }) => {
            setIsConnected(false);
          }
        );

        player.addListener("player_state_changed", async (state: any) => {
          if (!state) return;

          const currentTrack = state.track_window.current_track;
          const position = state.position;
          const duration = state.duration;
          const isPaused = state.paused;

          dispatch({
            type: "SET_TRACK",
            payload: currentTrack,
          });
          dispatch({ type: isPaused ? "PAUSE" : "PLAY" });
          dispatch({ type: "SET_PROGRESS", payload: position });
          dispatch({ type: "SET_DURATION", payload: duration });

          // Se a música está próxima do fim (menos de 1 segundo) ou terminou
          if (
            duration > 0 &&
            (position >= duration - 1000 || position === 0) &&
            isPaused
          ) {
            await nextTrack();
          }
        });
      };

      setupListeners();

      player
        .connect()
        .then((success: boolean) => {
          if (success) {
            dispatch({ type: "SET_PLAYER", payload: player });
            setIsConnected(true);
            setShowPlayer(true);
          } else {
            setIsConnected(false);
          }
        })
        .catch((error: any) => {
          setIsConnected(false);
        });

      return player;
    } catch (error) {
      return null;
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    let scriptElement = document.getElementById(
      "spotify-player-sdk"
    ) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = "spotify-player-sdk";
      scriptElement.src = "https://sdk.scdn.co/spotify-player.js";
      scriptElement.async = true;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.onSpotifyWebPlaybackSDKReady = () => {
        setIsSDKLoaded(true);
      };

      document.body.appendChild(scriptElement);
    }

    const cleanup = () => {
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.onSpotifyWebPlaybackSDKReady = null;
      setIsSDKLoaded(false);
    };

    return cleanup;
  }, [token]);

  // Inicialização do player quando o SDK estiver pronto
  useEffect(() => {
    if (isSDKLoaded && token && !state.player) {
      const checkInterval = setInterval(() => {
        if (checkSDKAvailable()) {
          clearInterval(checkInterval);
          const player = initializePlayer();
          if (player) {
            dispatch({ type: "SET_PLAYER", payload: player });
          }
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }
  }, [isSDKLoaded, token, initializePlayer, state.player]);

  const handlePlayPause = async () => {
    if (!state.player) return;

    try {
      await state.player.togglePlay();
    } catch (error) {}
  };

  const handleNextTrack = async () => {
    if (!state.player) {
      return;
    }

    try {
      const currentState = await state.player.getCurrentState();

      if (!currentState) {
        return;
      }

      state.player._options.getOAuthToken((token: string) => {
        fetch(`https://api.spotify.com/v1/me/player/next`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((error) => {
                throw error;
              });
            }

            setTimeout(async () => {
              const newState = await state.player.getCurrentState();
              if (newState) {
                dispatch({
                  type: "SET_TRACK",
                  payload: newState.track_window.current_track,
                });
                dispatch({ type: newState.paused ? "PAUSE" : "PLAY" });
                dispatch({ type: "SET_PROGRESS", payload: newState.position });
                dispatch({ type: "SET_DURATION", payload: newState.duration });
              }
            }, 500);
          })
          .catch((error) => {});
      });
    } catch (error) {}
  };

  const handlePreviousTrack = async () => {
    if (!state.player) {
      return;
    }

    try {
      state.player._options.getOAuthToken((token: string) => {
        fetch(
          `https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then(async (response) => {
            if (!response.ok) {
              const error = await response.json();
              throw error;
            }

            await new Promise((resolve) => setTimeout(resolve, 500));

            const newState = await state.player.getCurrentState();
            if (newState) {
              dispatch({
                type: "SET_TRACK",
                payload: newState.track_window.current_track,
              });
              dispatch({ type: newState.paused ? "PAUSE" : "PLAY" });
              dispatch({ type: "SET_PROGRESS", payload: 0 });
              dispatch({ type: "SET_DURATION", payload: newState.duration });
            }
          })
          .catch((error) => {});
      });
    } catch (error) {}
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.is_active && !state.is_paused) {
      interval = setInterval(async () => {
        // Pega o estado atual do player para ter informações mais precisas
        if (state.player) {
          const currentState = await state.player.getCurrentState();
          if (currentState) {
            const { position, duration, paused } = currentState;
            dispatch({
              type: "SET_PROGRESS",
              payload: position,
            });

            // Se a música está próxima do fim (menos de 1 segundo) ou terminou
            if (duration > 0 && position >= duration - 1000) {
              await nextTrack();
            }
          }
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.is_active, state.is_paused, state.player, nextTrack]);

  useEffect(() => {
    if (
      isConnected ||
      !token ||
      !isSDKLoaded ||
      reconnectAttempts >= MAX_RECONNECT_ATTEMPTS
    )
      return;

    const reconnectTimer = setTimeout(() => {
      setReconnectAttempts((prev) => prev + 1);

      if (state.player) {
        state.player.connect().then((success: boolean) => {
          if (!success) {
            const newPlayer = initializePlayer();
            if (newPlayer) {
              dispatch({ type: "SET_PLAYER", payload: newPlayer });
            }
          }
        });
      } else {
        const newPlayer = initializePlayer();
        if (newPlayer) {
          dispatch({ type: "SET_PLAYER", payload: newPlayer });
        }
      }
    }, RECONNECT_INTERVAL);

    return () => clearTimeout(reconnectTimer);
  }, [isConnected, reconnectAttempts, token, initializePlayer, isSDKLoaded]);

  useEffect(() => {
    setReconnectAttempts(0);
  }, [token]);

  useEffect(() => {
    if (!currentTrack || !state.player || !isConnected || !deviceId) {
      return;
    }

    state.player._options.getOAuthToken((token: string) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        body: JSON.stringify({ uris: [currentTrack.uri] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw error;
          });
        }
        setShowPlayer(true);
      });
    });
  }, [currentTrack, state.player, isConnected, deviceId]);

  return {
    isConnected,
    showPlayer,
    state,
    dispatch,
    controls: {
      playPause: handlePlayPause,
      nextTrack: handleNextTrack,
      previousTrack: handlePreviousTrack,
    },
  };
}
