"use client";

import { CircleNotchIcon, InfoIcon } from "@phosphor-icons/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/base/input/input";
import { useAuth } from "../hooks/useAuth";
import styles from "./styles.module.scss";

export default function SignupPage() {
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [disabled, setDisabled] = useState<boolean>(true);

  const { signUp } = useAuth();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isNameValid = name.trim().length > 0;
    const isNicknameValid = nickname.trim().length > 0;
    const isEmailValid = emailRegex.test(email.trim());
    setDisabled(!(isNameValid && isNicknameValid && isEmailValid));
  }, [name, nickname, email]);

  const handleSignUp = async () => {
    if (disabled) return;

    await signUp.mutateAsync({
      name: name,
      nickname: nickname,
      email: email,
      bio: bio,
    }, {
      onError: (e) => {
        if (e.message === "HTTP error! status: 400") {
          toast.error(<p>O e-mail cadastrado deve ser o mesmo da sua conta <span className={styles.spotifyName}>Spotify®</span>.</p>)
        } else {
          toast.error(<p>Houve um erro ao tentar cadastrar. Tente novamente mais tarde.</p>)
        }
      }
    });

    redirect("/");
  };

  return (
    <main className={styles.signUpPage}>
      <section className={styles.signUpContainer}>
        <div className={styles.signUpHeader}>
          <h3>Estamos quase lá...</h3>
          <p>Só precisamos de mais algumas informações.</p>
        </div>
        <div className={styles.form}>
          <Input
            name="Nome"
            value={name}
            setValue={setName}
            placeholder="Ex.: Mateus Souza"
            required
          />
          <Input
            name="Apelido"
            value={nickname}
            setValue={setNickname}
            placeholder="Ex.: souzinha"
            required
          />
          <Input
            name="Email"
            value={email}
            setValue={setEmail}
            placeholder="Ex.: mateus.souza@email.com"
            required
          />
          <Input
            name="Bio"
            value={bio}
            setValue={setBio}
            placeholder="Ex.: Tô aqui pra compartilhar o que acho de música. Gosto de tudo um pouco e tô sempre caçando coisa nova pra ouvir e comentar. Se curte descobrir som, cola aqui."
            textArea
          />
          <div className={styles.info}>
            <InfoIcon color="#992E2E" size={16} />
            <span>Informações obrigatórias</span>
          </div>
        </div>
        <button
          className={styles.signUpBtn}
          onClick={handleSignUp}
          disabled={disabled}
        >
          {
            signUp.isPending ?
              <div className={styles.loadingWrapper}>
                <CircleNotchIcon size={24} />
              </div>
              :
              "Confirmar cadastro"
          }
        </button>
      </section>
    </main>
  );
}
