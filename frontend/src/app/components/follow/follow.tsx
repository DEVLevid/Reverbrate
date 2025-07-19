import { Network } from "@/types/profile";
import styles from "./styles.module.scss";

interface FollowProps {
    network: Network;
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

export default function Follow({ network: { followers, following, reviews, lists } }: FollowProps) {
    return (
        <div className={styles.container}>
            <InfoView title="Seguidores" value={followers} />
            <InfoView title="Seguindo" value={following} />
            <InfoView title="Reviews" value={reviews} />
            <InfoView title="Listas" value={lists} />
        </div>
    );
}