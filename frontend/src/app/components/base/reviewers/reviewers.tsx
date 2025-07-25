import { TrackNetwork } from "@/types/search";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import styles from "./styles.module.scss";
import { StarSelector } from "../starSelector/starSelector";

interface TrackReviewersOverlapProps {
  trackNetworks: TrackNetwork[];
}

export default function TrackReviewersOverlap({
  trackNetworks,
}: TrackReviewersOverlapProps) {
  const networksToDisplay = trackNetworks.slice(0, 4);

  if (networksToDisplay.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {networksToDisplay.map((network, index) => {
        return (
          <Tooltip
            title={
              <div>
                <h3>
                  <strong>Usuário: </strong> {network.created_by.name}
                </h3>
                <p className={styles.starContainer}>
                  <strong>Nota: </strong>{" "}
                  <StarSelector
                    rating={network.rate}
                    setRating={() => {}}
                    disabled
                  />
                </p>
                <p>
                  <strong>Comentário: </strong> {network.comment}
                </p>
              </div>
            }
            key={network.created_by.id || index}
          >
            <div className={styles.item}>
              <Avatar
                size={30}
                src={network.created_by.image}
                icon={<UserOutlined />}
                alt={network.created_by.name || `Reviewer ${index + 1}`}
              />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}
