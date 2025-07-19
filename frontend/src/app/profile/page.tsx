"use client";

import NavBar from "../components/navBar/navBar";
import ReviewList from "../components/reviewList/reviewList";
import UserInfo from "../components/userInfo/userInfo";
import { useProfile } from "../hooks/useProfile";
import styles from "./styles.module.scss";

export default function Profile() {
    const { getProfile } = useProfile();
    const { data: profile, isLoading, isError } = getProfile();

    return (
        <>
            <NavBar />
            <main className={styles.container}>
                <section className={styles.userWrapper}>
                    {!isLoading && profile && <UserInfo id={profile.id} name={profile.name} nickname={profile.nickname} bio={profile.bio} image={profile.image} />}
                    {/* {!isLoading && profile && <Follow network={profile.network} />} */}
                </section>
                <section className={styles.listsWrapper}>
                    {!isLoading && profile && <ReviewList title="Avaliações recentes" reviews={profile.reviews} />}
                    {/* {!isLoading && profile && <ListList title="Listas recentes" lists={profile.lists} />} */}
                </section>
            </main>
        </>
    );
}
