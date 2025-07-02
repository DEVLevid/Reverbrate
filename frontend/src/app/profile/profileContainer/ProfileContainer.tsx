"use client";

import { ProfileInfo } from "@/types/user";
import { useEffect, useState } from "react";
import ProfileHeader from "../profileHeader/ProfileHeader";
import styles from "./styles.module.scss";
import ReviewsCarousel from "../reviewsCarousel/ReviewsCarousel";
import { ReviewsResponse } from "@/types/reviews";

function ProfileContainer() {
    const [profile, setProfile] = useState<ProfileInfo | undefined>();

    useEffect(() => {}, []);

    return (
        <main className={styles.profileContainer}>
            <article className={styles.profileFirstWrapper}>
                <ProfileHeader
                    name={profile ? profile.name : ""}
                    email={profile ? profile.email : ""}
                    image={profile ? profile.image : ""}
                />
                <ReviewsCarousel
                    reviews={
                        profile ? profile.reviews : ({} as ReviewsResponse)
                    }
                />
            </article>
            <article>
                <h1>TESTE</h1>
            </article>
        </main>
    );
}

export default ProfileContainer;
