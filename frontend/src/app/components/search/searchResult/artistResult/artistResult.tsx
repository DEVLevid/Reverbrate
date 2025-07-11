import React from 'react'
import styles from './styles.module.scss';
import { ArtistItem } from '@/types/search';
import { Carousel } from 'antd';

export default function ArtistsResult({ artists }: { artists: ArtistItem[] }) {
    return (
      <div className={styles.container}>
        <h3>Artistas</h3>
        <Carousel
          dots={false}
          arrows={true}
          slidesToShow={4}
          slidesToScroll={1}
          infinite={false}
          className={styles.artistList}
        >
          {artists.map((artist) => (
            <div key={artist.id} className={styles.artistItem}>
              <img
                src={artist.cover}
                alt={artist.name}
                className={styles.artistCover}
              />
              <div className={styles.info}>
                <h3 className={styles.name}>{artist.name}</h3>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }