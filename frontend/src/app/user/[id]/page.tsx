"use client";

import { useUser } from "@/app/hooks/useUser";
import { useParams } from "next/navigation";
import Error from "../../components/base/error/error";
import FollowSkeleton from "../../components/follow/followSkeleton/followSkeleton";
import NavBar from "../../components/navBar/navBar";
import ReviewList from "../../components/reviewList/reviewList";
import ReviewListSkeleton from "../../components/reviewList/reviewListSkeleton/reviewListSkeleton";
import UserInfo from "../../components/userInfo/userInfo";
import UserInfoSkeleton from "../../components/userInfo/userInfoSkeleton/userInfoSkeleton";
import styles from "./styles.module.scss";

export default function Profile() {
    const { id } = useParams() as { id: string };
    const { getUserById } = useUser();
    const { data: user, isLoading, isError } = getUserById(id);

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
                                    />
                                )
                            )}
                            {isLoading ? (
                                <FollowSkeleton />
                            ) : (
                                user && (
                                    // <Follow network={user.network} />}
                                    <p>follow</p>
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
                                user && (
                                    // <ListList title="Listas recentes" lists={user.lists} />
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
