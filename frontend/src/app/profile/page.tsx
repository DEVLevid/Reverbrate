"use client";

import { useQueryClient } from "@tanstack/react-query";
import Error from "../components/base/error/error";
import Follow from "../components/follow/follow";
import FollowSkeleton from "../components/follow/followSkeleton/followSkeleton";
import NavBar from "../components/navBar/navBar";
import ReviewList from "../components/reviewList/reviewList";
import ReviewListSkeleton from "../components/reviewList/reviewListSkeleton/reviewListSkeleton";
import UserInfo from "../components/userInfo/userInfo";
import UserInfoSkeleton from "../components/userInfo/userInfoSkeleton/userInfoSkeleton";
import { useProfile } from "../hooks/useProfile";
import styles from "./styles.module.scss";
import List from "../components/list/list";
import { useLists } from "../hooks/useLists";
import ListContainer from "./listContainer/listContainer";

export default function Profile() {
  const { getProfile } = useProfile();
  const { data: profile, isLoading, isError } = getProfile();
  const { fetchLists } = useLists();
  const { data: list } = fetchLists();

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
                profile && (
                  <UserInfo
                    id={profile.id}
                    name={profile.name}
                    nickname={profile.nickname}
                    bio={profile.bio}
                    image={profile.image}
                                        isEditable
                                        isFetching={isFetching}
                                        updateHook={updateProfile}
                  />
                )
              )}
              {isLoading ? (
                <FollowSkeleton />
              ) : (
                profile && (
                  <Follow network={profile.network} hasFollow={false} />
                )
              )}
            </section>
            <section className={styles.contentWrapper}>
              {isLoading ? (
                <ReviewListSkeleton />
              ) : (
                profile && (
                  <ReviewList
                    title="Avaliações recentes"
                    reviews={profile.reviews}
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
