import { TrackWithReview } from "@/types/search";
import { DotsThreeIcon, TextAlignLeftIcon } from "@phosphor-icons/react";
import { Tooltip } from "antd";
import Image from "next/image";
import Item from "../base/item/item";
import BaseReview from "../review/review";
import styles from "./styles.module.scss";

interface MusicItemProps {
    track: TrackWithReview;
}
export default function MusicItem({ track }: MusicItemProps) {
    return <Item>
        <div className={styles.infoWrapper}>
            <Image src={track.cover} alt={"Capa do album da musica" + track.name} width={60} height={60} className={styles.image} />
            <div className={styles.infoWrapperText}>
                <h3>{track.name}</h3>
                <p>{track.artist_name}</p>
            </div>
        </div>
        <div className={styles.reviewWrapperDesktop}>
            {track.review?.comment && (
                <Tooltip title={"\"" + track.review.comment + "\""} placement="top" className={styles.commentIcon}>
                    <TextAlignLeftIcon size={24} />
                </Tooltip>
            )}
            <BaseReview track={track} />
            <button className={styles.optionBtn}>
                <DotsThreeIcon size={28} />
            </button>
        </div>

        <div className={styles.reviewWrapperMobile}>
            <BaseReview track={track} />
            <div className={styles.options}>
                {track.review?.comment && (
                    <Tooltip title={"\"" + track.review.comment + "\""} placement="top" className={styles.commentIcon}>
                        <TextAlignLeftIcon size={24} />
                    </Tooltip>
                )}
                <button className={styles.optionBtn}>
                    <DotsThreeIcon size={28} />
                </button>
            </div>
        </div>
    </Item>
}