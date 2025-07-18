import { User } from "@/types/profile";
import { CopySimpleIcon } from "@phosphor-icons/react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Tooltip } from "antd";

interface UserInfoProps {
    user: User;
}

export default function UserInfo({ user: { image, name, id, bio = "Sou Leonardo Brito, apaixonado por música em todas as suas formas. Gosto de explorar diferentes estilos, descobrir novos sons e compartilhar minhas impressões com sinceridade e respeito. Para mim, cada faixa tem uma história — e avaliá-las é uma forma de valorizar a arte por trás de cada batida, verso e melodia." } }: UserInfoProps) {
    return (
        <div className={styles.container}>
            <Image src={image} alt={"Imagem de perfil de " + name} width={192} height={192} className={styles.image} />
            <div className={styles.infoWrapper}>
                <div className={styles.titleWrapper}>
                    <h3>{name}</h3>
                    <div className={styles.idWrapper}>
                        <span>{name.trim() + "#" + id}</span>
                        <button>
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