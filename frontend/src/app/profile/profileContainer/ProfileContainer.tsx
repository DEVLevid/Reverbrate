"use client";

import { useProfile } from "@/app/hooks/useProfile";
import ProfileHeader from "../profileHeader/ProfileHeader";
import ProfileHeaderSkeleton from "../profileHeader/profileHeaderSkeleton/ProfileHeaderSkeleton";
import ReviewsCarousel from "../reviewsCarousel/ReviewsCarousel";
import ReviewsCarouselSkeleton from "../reviewsCarousel/reviewsCarouselSkeleton/ReviewsCarouselSkeleton";
import styles from "./styles.module.scss";

function ProfileContainer() {
    const { getProfile } = useProfile();
    const { data: profile, isLoading, isError } = getProfile();

    return (
        <main className={styles.profileContainer}>
            {isError ? (
                <>
                    <h2 className={styles.profileErrorMessage}>
                        Houve um erro, tente novamente mais tarde.
                    </h2>
                </>
            ) : isLoading ? (
                <article className={styles.profileFirstWrapper}>
                    <ProfileHeaderSkeleton />
                    <ReviewsCarouselSkeleton />
                </article>
            ) : (
                <>
                    <article className={styles.profileFirstWrapper}>
                        <ProfileHeader
                            name={profile!.name}
                            email={profile!.email}
                            image={profile!.image}
                        />
                        <ReviewsCarousel reviews={profile!.reviews} />
                    </article>
                    <article>
                        <h1>TESTE</h1>
                    </article>
                </>
            )}
        </main>
    );
}

export default ProfileContainer;
