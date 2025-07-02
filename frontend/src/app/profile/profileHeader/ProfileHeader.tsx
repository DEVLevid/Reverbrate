import Image from "next/image";

import ProfileHeaderSkeleton from "./profileHeaderSkeleton/ProfileHeaderSkeleton";
import styles from "./styles.module.scss";

interface ProfileHeaderProps {
    name: string;
    email: string;
    image: string;
}

function ProfileHeader({ name, email, image }: ProfileHeaderProps) {
    const isLoading = !name;

    if (isLoading) {
        return <ProfileHeaderSkeleton />;
    }

    return (
        <div className={styles.profileHeaderContainer}>
            <Image
                src={image}
                alt={"Imagem de Perfil de " + name}
                width={192}
                height={192}
                className={styles.profileHeaderImage}
                style={{ borderRadius: "50%" }}
            />
            <div className={styles.profileHeaderText}>
                <h3 className={styles.profileHeaderName}>{name}</h3>
                <p className={styles.profileHeaderEmail}>{email}</p>
            </div>
        </div>
    );
}

export default ProfileHeader;
