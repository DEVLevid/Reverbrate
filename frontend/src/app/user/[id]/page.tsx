"use client";

import Follow from "@/app/components/follow/follow";
import ListList from "@/app/components/listList/listList";
import { useUser } from "@/app/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { redirect, useParams } from "next/navigation";
import Error from "../../components/base/error/error";
import FollowSkeleton from "../../components/follow/followSkeleton/followSkeleton";
import NavBar from "../../components/navBar/navBar";
import ReviewList from "../../components/reviewList/reviewList";
import ReviewListSkeleton from "../../components/reviewList/reviewListSkeleton/reviewListSkeleton";
import UserInfo from "../../components/userInfo/userInfo";
import UserInfoSkeleton from "../../components/userInfo/userInfoSkeleton/userInfoSkeleton";
import styles from "./styles.module.scss";
import { useProfile } from "@/app/hooks/useProfile";
import ListContainer from "@/app/profile/listContainer/listContainer";

export default function Profile() {
  const { id } = useParams() as { id: string };

  const queryClient = useQueryClient();
  const { getUserById, updateFollow } = useUser(queryClient);

  const { data: user, isLoading, isFetching, isError } = getUserById(id);
  const { isPending } = updateFollow;

  const { getProfile } = useProfile(queryClient);
  const { data: profile } = getProfile();

  const handleFollow = async () => {
    if (user) {
      updateFollow.mutate(user.id);
    }
  };

  return (
    <>
      <NavBar />
      <main className={styles.container}>
        {isError ? (
          <Error />
        ) : (
          <>
            <section className={styles.userWrapper}>
              {isLoading ? (
                <UserInfoSkeleton />
              ) : (
                user && (
                  <UserInfo
                    id={user.id}
                    name={user.name}
                    nickname={user.nickname}
                    bio={user.bio}
                    image={user.image}
                    isEditable={false}
                  />
                )
              )}
              {isLoading ? (
                <FollowSkeleton />
              ) : (
                user && (
                  <Follow
                    network={user.network}
                    hasFollow
                    isFollowing={user.is_following}
                    setFollow={handleFollow}
                    isLoading={isPending || isFetching}
                  />
                )
              )}
            </section>
            <section className={styles.listsWrapper}>
              {isLoading ? (
                <ReviewListSkeleton />
              ) : (
                user && (
                  <ReviewList
                    title="Avaliações recentes"
                    reviews={user.reviews}
                  />
                )
              )}

              {isLoading ? (
                <ReviewListSkeleton />
              ) : (
                profile && <ListContainer />
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
