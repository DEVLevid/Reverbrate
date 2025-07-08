import { Skeleton } from "antd";
import styles from "./styles.module.scss";

function ProfileHeaderSkeleton() {
    return (
        <div className={styles.profileHeaderContainer}>
            <Skeleton.Input
                active
                style={{
                    width: "128px",
                    minWidth: "128px",
                    height: "128px",
                    backgroundColor: "#1C1825",
                    borderRadius: "100%",
                }}
            />
            <div className={styles.profileHeaderText}>
                <Skeleton.Input
                    active
                    style={{
                        width: "160px",
                        height: "36px",
                        backgroundColor: "#1C1825",
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: "200px",
                        height: "20px",
                        backgroundColor: "#1C1825",
                    }}
                />
            </div>
        </div>
    );
}

export default ProfileHeaderSkeleton;
