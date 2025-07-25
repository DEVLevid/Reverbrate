import AddListModal from "@/app/components/list/addListModal/addListModal";
import { TrackWithReview } from "@/types/search";
import { DotsThreeIcon, TextAlignLeftIcon } from "@phosphor-icons/react";
import { Dropdown, Tooltip } from "antd";
import Image from "next/image";
import { useState } from "react";
import Item from "../base/item/item";
import BaseReview from "../review/review";
import styles from "./styles.module.scss";
import TrackReviewersOverlap from "../base/reviewers/reviewers";

interface MusicItemProps {
  track: TrackWithReview;
  variant: "primary" | "secondary";
}
export default function MusicItem({ track, variant = "primary" }: MusicItemProps) {
  const [addToListModalOpen, setAddToListModalOpen] = useState(false);

  const menuItems = [
    {
      key: "add-to-list",
      label: (
        <span onClick={() => setAddToListModalOpen(true)}>
          Adicionar à lista
        </span>
      ),
    },
  ];

  return (
    <Item variant={variant}>
      <div className={styles.infoWrapper}>
        <Image
          src={track.cover}
          alt={"Capa do album da musica" + track.name}
          width={60}
          height={60}
          className={styles.image}
        />
        <div className={styles.infoWrapperText}>
          <h3>{track.name}</h3>
          <p>{track.artist_name}</p>
        </div>
      </div>
      <div className={styles.reviewersWrapperMobile}>
        {track.network && (
          <TrackReviewersOverlap trackNetworks={track.network} />
        )}
      </div>
      <div className={styles.reviewWrapperDesktop}>
        {track.review?.comment && (
          <Tooltip
            title={'"' + track.review.comment + '"'}
            placement="top"
            className={styles.commentIcon}
          >
            <TextAlignLeftIcon size={24} />
          </Tooltip>
        )}
        <BaseReview track={track} />
        <div className={styles.reviewersWrapperDesktop}>
          {track.network && (
            <TrackReviewersOverlap trackNetworks={track.network} />
          )}
        </div>
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          placement="bottomRight"
          arrow
        >
          <button className={styles.optionBtn}>
            <DotsThreeIcon size={28} />
          </button>
        </Dropdown>
      </div>

      <div className={styles.reviewWrapperMobile}>
        <BaseReview track={track} />
        <div className={styles.options}>
          {track.review?.comment && (
            <Tooltip
              title={'"' + track.review.comment + '"'}
              placement="top"
              className={styles.commentIcon}
            >
              <TextAlignLeftIcon size={24} />
            </Tooltip>
          )}
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <button className={styles.optionBtn}>
              <DotsThreeIcon size={28} />
            </button>
          </Dropdown>
        </div>
      </div>
      <AddListModal
        open={addToListModalOpen}
        onClose={() => setAddToListModalOpen(false)}
        itemId={track.id}
      />
    </Item>
  );
}
