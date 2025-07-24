import { useProfile } from "@/app/hooks/useProfile";
import { CopySimpleIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../base/input/input";
import BaseModal from "../base/modal/baseModal";
import styles from "./styles.module.scss";
import { useRouter } from 'next/navigation';

interface UserInfoProps {
  id: string;
  name: string;
  nickname: string;
  bio: string;
  image: string;
  isEditable: boolean;
  isFetching?: boolean;
}

export default function UserInfo({
  image,
  name,
  nickname,
  id,
  bio,
  isEditable,
  isFetching = false,
}: UserInfoProps) {
  const queryClient = useQueryClient();
  const { updateProfile } = useProfile(queryClient);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [newName, setNewName] = useState<string>(name);
  const [newBio, setNewBio] = useState<string>(bio);

  const confirmLoading = updateProfile.isPending || isFetching;

  useEffect(() => {
    if (isModalOpen) {
      setIsModalOpen(confirmLoading);
    }
  }, [updateProfile.isPending, isFetching]);

  const handleCopyID = async () => {
    try {
      await navigator.clipboard.writeText(nickname.trim() + "#" + id);
      toast.success("ID copiado com sucesso!");
    } catch (e) {
      toast.error("Não foi possível copiar esse ID");
    }
  };

  const handleImageClick = () => {
    if (!isEditable) return;

    setIsModalOpen(true);
  };

  const handleEditProfile = async () => {
    if (!(name.trim().length > 0)) {
      toast.error("Nome não pode ser vazio!");
      return;
    }

    try {
      await updateProfile.mutateAsync({
        name: newName,
        bio: newBio,
        is_private: false,
      });

      toast.success("Perfil editado com sucesso!");
    } catch (err) {
      toast.error("Erro ao editar perfil.");
    }
  };

    const router = useRouter();
    const goToProfile = () => router.push(`/user/${id}`);
  return (
    <div className={styles.container}>
      <div
        className={styles.imageWrapper}
        onMouseEnter={() => setIsHovered(isEditable)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleImageClick}
      >
        <Image
          src={image}
          alt={"Imagem de perfil de " + name}
          width={192}
          height={192}
          className={styles.image}
        onClick={goToProfile} style={{ cursor: 'pointer' }} />
        {isHovered && (
          <div className={styles.overlay}>
            <PencilSimpleLineIcon size={32} color="#FFF" />
          </div>
        )}
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.titleWrapper}>
          <h3 style={{ cursor: 'pointer' }} onClick={goToProfile}>{name}</h3>
          <div className={styles.idWrapper}>
            <span>{nickname.trim() + "#" + id}</span>
            <button onClick={handleCopyID}>
              <CopySimpleIcon size={16} />
            </button>
          </div>
        </div>
        {bio ? (
          <Tooltip title={bio} placement="bottom">
            <p className={styles.bio}>{bio}</p>
          </Tooltip>
        ) : (
          <i className={styles.noBio}>Você ainda não adicionou uma bio...</i>
        )}
      </div>

      <BaseModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleEditProfile}
        okText="Enviar"
        cancelText="Cancelar"
        confirmLoading={confirmLoading}
        title="Adicione sua Avaliação"
      >
        <div className={styles.formWrapper}>
          <Input
            name="Nome"
            value={newName}
            setValue={setNewName}
            placeholder="Ex.: Mateus Souza"
            required
          />
          <Input
            name="Bio"
            value={newBio}
            setValue={setNewBio}
            placeholder="Ex.: Tô aqui pra compartilhar o que acho de música. Gosto de tudo um pouco e tô sempre caçando coisa nova pra ouvir e comentar. Se curte descobrir som, cola aqui."
            textArea
          />
        </div>
      </BaseModal>
    </div>
  );
}
