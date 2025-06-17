"use client";
import { SkipForwardCircle, SpotifyLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import styles from "./styles.module.scss";

export default function Login() {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src="homePage.svg"
          alt="Home Page"
          width={500}
          height={300}
        />
      </div>

      <div className={styles.welcomeContainer}>
        <div className={styles.messageContent}>
          <div className={styles.welcomeMessage}>
            <h2 className={styles.welcomeText}>
              <SkipForwardCircle size={32} />
              ReverbRate
            </h2>
            <h1>Seja Bem-Vindo !</h1>
            <p>Faça login e aproveite o máximo dos benefícios do ReverbRate</p>
          </div>

          <Image
            className={styles.image2}
            src="homePage2.svg"
            alt="Home Page 2"
            width={200}
            height={200}
          />

          <div className={styles.loginContainer}>
            <button className={styles.loginButton} onClick={handleLogin}>
              {" "}
              <SpotifyLogo size={32} />
              Continuar com Spotify
            </button>
            <p>
              Pode ficar tranquilo, nós usamos a sua <br /> conta do Spotify de
              forma segura!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
