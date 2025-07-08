import { Skeleton } from "antd";
import styles from "./styles.module.scss";

function ProfileHeaderSkeleton() {
    return (
        <div className={styles.profileHeaderContainer}>
            <Skeleton.Input
                active
                className={styles.profileHeaderAvatar}
            />
            <div className={styles.profileHeaderText}>
                <Skeleton.Input
                    active
                    className={styles.profileHeaderName}
                />
                <Skeleton.Input
                    active
                    className={styles.profileHeaderBio}
                />
            </div>
        </div>
    );
}

export default ProfileHeaderSkeleton;
