import { TrackWithReview } from "@/types/search";
import { DotsThreeIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Item from "../base/item/item";
import BaseReview from "../review/review";
import styles from "./styles.module.scss";

interface MusicItemProps {
    track: TrackWithReview;
    ommitArtist?: boolean;
}
export default function MusicItem({ track, ommitArtist }: MusicItemProps) {
    return <Item key={track.id}>
        <div className={styles.infoWrapper}>
            <Image src={track.cover} alt={"Capa do album da musica" + track.name} width={60} height={60} className={styles.image} />
            <div className={styles.infoWrapperText}>
                <h3>{track.name} {!ommitArtist && `- ${track.artist_name}`}</h3>
                {track.review?.comment ? <p>{track.review.comment}</p> : <p>Você ainda não comentou sobre essa música!</p>}
            </div>
        </div>
        <div className={styles.reviewWrapper}>
            <BaseReview track={track} />
            <button className={styles.optionBtn}>
                <DotsThreeIcon size={28} />
            </button>
        </div>
    </Item>
}