
import { CopySimpleIcon } from "@phosphor-icons/react";
import { Tooltip } from "antd";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./styles.module.scss";
import { useRouter } from 'next/navigation';

interface UserInfoProps {
    id: string;
    name: string;
    nickname: string;
    bio: string;
    image: string;
}

export default function UserInfo({ image, name, nickname, id, bio }: UserInfoProps) {
    const handleCopyID = async () => {
        try {
            await navigator.clipboard.writeText(nickname.trim() + "#" + id);
            toast.success("ID copiado com sucesso!");
        } catch (e) {
            toast.error("Não foi possível copiar esse ID");
        }
    }
    const router = useRouter();
    const goToProfile = () => router.push(`/user/${id}`);
    return (
        <div className={styles.container}>
            <Image src={image} alt={"Imagem de perfil de " + name} width={192} height={192} className={styles.image} onClick={goToProfile} style={{ cursor: 'pointer' }} />
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
                {bio ?
                    <Tooltip title={bio} placement="bottom">
                        <p className={styles.bio}>{bio}</p>
                    </Tooltip>
                    :
                    <i className={styles.noBio}>Você ainda não adicionou uma bio...</i>
                }
            </div>
        </div>
    )
}