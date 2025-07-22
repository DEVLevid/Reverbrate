import { Network } from "@/types/profile";
import { CircleNotchIcon } from "@phosphor-icons/react";
import styles from "./styles.module.scss";

interface FollowProps {
    network: Network;
    hasFollow: boolean;
    isFollowing?: boolean;
    setFollow?: (isFollowing: boolean) => void;
    isLoading?: boolean;
}

interface InfoView {
    title: string;
    value: number;
}

function InfoView({ title, value }: InfoView) {
    return (
        <div className={styles.wrapper}>
            <div>
                <h4>{title}</h4>
                <span>{value}</span>
            </div>
        </div>
    );
}

export default function Follow({
    network: { followers, following, reviews, lists },
    hasFollow,
    isFollowing,
    setFollow,
    isLoading,
}: FollowProps) {
    return (
        <div className={styles.container}>
            <InfoView title="Seguidores" value={followers} />
            <InfoView title="Seguindo" value={following} />
            <InfoView title="Reviews" value={reviews} />
            <InfoView title="Listas" value={lists} />
            {hasFollow && (
                <button
                    className={styles.followBtn}
                    onClick={() => {
                        if (setFollow) {
                            setFollow(!isFollowing);
                        }
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className={styles.loadingWrapper}>
                            <CircleNotchIcon size={18} />
                        </div>
                    ) : isFollowing ? (
                        "Deixar de seguir"
                    ) : (
                        "Seguir"
                    )}
                </button>
            )}
        </div>
    );
}
