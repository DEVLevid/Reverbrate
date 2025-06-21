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

function PlayerMusicInfo({ title, artists, album }: PlayerMusicInfoProps) {
  const artistNames = artists.map((artist) => artist.name).join(", ");
  const albumImageSrc =
    album.images.length > 0 ? album.images[0].url : "https://placehold.co/32";

  return (
    <section className={styles.musicInfoContainer}>
      <img src={albumImageSrc} alt={album.name} className={styles.albumImage} />
      <div className={styles.musicInfoTextContainer}>
        <h2 className={styles.musicTitle}>{title ? title : "Nome da faixa"}</h2>
        <p className={styles.musicArtist}>
          {artistNames ? artistNames : "Nomes dos artistas"}
        </p>
      </div>
    </section>
  );
}

export default PlayerMusicInfo;
