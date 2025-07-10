"use client";

import { useProfile } from "@/app/hooks/useProfile";
import ProfileHeader from "../profileHeader/ProfileHeader";
import ProfileHeaderSkeleton from "../profileHeader/profileHeaderSkeleton/ProfileHeaderSkeleton";
import ReviewsCarousel from "../reviewsCarousel/ReviewsCarousel";
import ReviewsCarouselSkeleton from "../reviewsCarousel/reviewsCarouselSkeleton/ReviewsCarouselSkeleton";
import styles from "./styles.module.scss";
import { useReviews } from "@/app/hooks/useReviews";
import ListsCarousel from "../listsCarousel/ListsCarousel";
import FollowersInfo from "../followersInfo/FollowersInfo";

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
          {/* <ListsCarouselSkeleton /> */}
        </article>
      ) : (
        <>
          {profile && (
            <>
              <article className={styles.profileFirstWrapper}>
                <ProfileHeader
                  name={profile.user.name}
                  email={profile.user.email}
                  image={profile.user.image}
                />
                <ReviewsCarousel reviews={profile.reviews} />
              </article>
              <article>
                <FollowersInfo />
                <ListsCarousel lists={profile.lists} />
              </article>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default ProfileContainer;
