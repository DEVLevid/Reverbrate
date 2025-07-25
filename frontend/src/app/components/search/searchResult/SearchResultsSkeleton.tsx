import React from "react";
import UserInfoSkeleton from "@/app/components/userInfo/userInfoSkeleton/userInfoSkeleton";
import MusicItemSkeleton from "@/app/components/musicItem/musicItemSkeleton/musicItemSkeleton";
import styles from "./styles.module.scss";

export default function SearchResultsSkeleton() {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Usuários</h2>
        <div style={{ display: "flex", gap: 16 }}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <UserInfoSkeleton key={idx} />
          ))}
        </div>
      </div>

      <div className={styles.tracksAndBestResultContainer}>
        <div className={styles.bestResultContainer}>
          <h2 className={styles.title}>Melhor Resultado</h2>
          <div style={{ width: 480, maxWidth: "100%" }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              width: "30rem",
              height: "23rem",
              background: "#222",
              borderRadius: 8,
              gap: 16,
              overflow: "hidden"
            }}>
              <div style={{ width: "100%", height: 180, display: "flex", alignItems: "center", justifyContent: "center", background: "#222" }} />
              <div style={{ padding: "0 1rem 1.5rem 1rem", display: "flex", flexDirection: "column", gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ width: 120, height: 24, background: "#333", borderRadius: 4, marginBottom: 8 }} />
                    <div style={{ width: 80, height: 18, background: "#444", borderRadius: 4 }} />
                  </div>
                  <div style={{ width: 80, height: 24, background: "#333", borderRadius: 4 }} />
                </div>
                <div style={{ width: "100%", height: 32, background: "#222", borderRadius: 4 }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tracksContainer}>
          <h2 className={styles.title}>Músicas</h2>
          <div className={styles.trackList} style={{ width: '100%' }}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <MusicItemSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.albumContainer}>
        <h3>Álbuns</h3>
        <div style={{ display: "flex", gap: 24 }}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 240 }}>
              <div style={{ width: 240, height: 240, background: "#222", borderRadius: 8, marginBottom: 8 }} />
              <div style={{ width: 120, height: 20, background: "#333", borderRadius: 4, marginBottom: 4 }} />
              <div style={{ width: 100, height: 16, background: "#444", borderRadius: 4 }} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.artistContainer}>
        <h3>Artistas</h3>
        <div style={{ display: "flex", gap: 24 }}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 240 }}>
              <div style={{ width: 240, height: 240, background: "#222", borderRadius: 8, marginBottom: 8 }} />
              <div style={{ width: 120, height: 20, background: "#333", borderRadius: 4 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 