import { Skeleton } from "antd";
import styles from "./styles.module.scss";

function ProfileHeaderSkeleton() {
    return (
        <div className={styles.profileHeaderContainer}>
            <Skeleton.Input
                active
                style={{
                    width: "192px",
                    height: "192px",
                    backgroundColor: "#1C1825",
                    borderRadius: "100%",
                }}
            />
            <div className={styles.profileHeaderText}>
                <Skeleton.Input
                    active
                    style={{
                        width: "200px",
                        height: "36px",
                        backgroundColor: "#1C1825",
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: "250px",
                        height: "24px",
                        marginTop: "8px",
                        backgroundColor: "#1C1825",
                    }}
                />
            </div>
        </div>
    );
}

export default ProfileHeaderSkeleton;
