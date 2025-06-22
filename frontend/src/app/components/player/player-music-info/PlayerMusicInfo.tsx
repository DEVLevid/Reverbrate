// Nenhuma alteração necessária aqui. O código anterior está correto.
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface ArtistInfoProps {
  uri: string;
  name: string;
}

interface AlbumInfoProps {
  uri: string;
  name: string;
  images: { url: string }[];
}

interface PlayerMusicInfoProps {
  title: string;
  artists: ArtistInfoProps[];
  album: AlbumInfoProps;
}

const SPEED_PIXELS_PER_SECOND = 40;

function PlayerMusicInfo({ title, artists, album }: PlayerMusicInfoProps) {
  const artistNames = artists.map((artist) => artist.name).join(", ");
  const albumImageSrc =
    album.images.length > 0 ? album.images[0].url : "https://placehold.co/60";

  const titleRef = useRef<HTMLDivElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);

  const [scrollTitle, setScrollTitle] = useState(false);
  const [scrollArtist, setScrollArtist] = useState(false);

  const [titleAnimation, setTitleAnimation] = useState({});
  const [artistAnimation, setArtistAnimation] = useState({});

  useEffect(() => {
    const t = titleRef.current;
    if (t) {
      const isOverflowing = t.scrollWidth > t.clientWidth;
      setScrollTitle(isOverflowing);
      if (isOverflowing) {
        const duration = t.scrollWidth / SPEED_PIXELS_PER_SECOND;
        setTitleAnimation({ animationDuration: `${duration}s` });
      } else {
        setTitleAnimation({});
      }
    }

    const a = artistRef.current;
    if (a) {
      const isOverflowing = a.scrollWidth > a.clientWidth;
      setScrollArtist(isOverflowing);
      if (isOverflowing) {
        const duration = a.scrollWidth / SPEED_PIXELS_PER_SECOND;
        setArtistAnimation({ animationDuration: `${duration}s` });
      } else {
        setArtistAnimation({});
      }
    }
  }, [title, artistNames]);

  return (
    <section className={styles.musicInfoContainer}>
      <img src={albumImageSrc} alt={album.name} className={styles.albumImage} />
      <div className={styles.musicInfoTextContainer}>
        <div className={styles.scrollWrapper}>
          <div
            className={`${styles.musicTitle} ${
              scrollTitle ? styles.scrollText : styles.staticText
            }`}
            ref={titleRef}
            style={titleAnimation}
          >
            {/* A estrutura interna permanece a mesma no JSX */}
            <span>{title || "Nome da faixa"}</span>
            {scrollTitle && <span>{title}</span>}
          </div>
        </div>
        <div className={styles.scrollWrapper}>
          <div
            className={scrollArtist ? styles.scrollText : styles.staticText}
            ref={artistRef}
            style={artistAnimation}
          >
            <span>{artistNames || "Nomes dos artistas"}</span>
            {scrollArtist && <span>{artistNames}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlayerMusicInfo;
