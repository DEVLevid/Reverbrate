"use client";

import Follow from "@/app/components/follow/follow";
import List from "@/app/components/list/list";
import { useLists } from "@/app/hooks/useLists";
import { useUser } from "@/app/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Error from "../../components/base/error/error";
import FollowSkeleton from "../../components/follow/followSkeleton/followSkeleton";
import NavBar from "../../components/navBar/navBar";
import ReviewList from "../../components/reviewList/reviewList";
import ReviewListSkeleton from "../../components/reviewList/reviewListSkeleton/reviewListSkeleton";
import UserInfo from "../../components/userInfo/userInfo";
import UserInfoSkeleton from "../../components/userInfo/userInfoSkeleton/userInfoSkeleton";
import styles from "./styles.module.scss";
import { ListType } from "@/types/lists";

export default function User() {
  const { id } = useParams() as { id: string };

  const queryClient = useQueryClient();
  const { getUserById, updateFollow } = useUser(queryClient);
  const { fetchListById } = useLists();

  const { data: user, isLoading, isFetching, isError } = getUserById(id);
  const { isPending } = updateFollow;

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
            <section className={styles.contentWrapper}>
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
                user && (
                  <List title="Listas" lists={user.lists.data} />
                )
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
