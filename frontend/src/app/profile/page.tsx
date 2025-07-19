"use client";

import Error from "../components/base/error/error";
import FollowSkeleton from "../components/follow/followSkeleton/followSkeleton";
import NavBar from "../components/navBar/navBar";
import ReviewList from "../components/reviewList/reviewList";
import ReviewListSkeleton from "../components/reviewList/reviewListSkeleton/reviewListSkeleton";
import UserInfo from "../components/userInfo/userInfo";
import UserInfoSkeleton from "../components/userInfo/userInfoSkeleton/userInfoSkeleton";
import { useProfile } from "../hooks/useProfile";
import styles from "./styles.module.scss";

export default function Profile() {
    const { getProfile } = useProfile();
    const { data: profile, isLoading, isError } = getProfile();

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
                                    />
                                )
                            )}
                            {isLoading ? (
                                <FollowSkeleton />
                            ) : (
                                profile && (
                                    // <Follow network={profile.network} />}
                                    <p>follow</p>
                                )
                            )}
                        </section>
                        <section className={styles.listsWrapper}>
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
                                profile && (
                                    // <ListList title="Listas recentes" lists={profile.lists} />
                                    <p>lists</p>
                                )
                            )}
                        </section>
                    </>
                )}
            </main>
        </>
    );
}
