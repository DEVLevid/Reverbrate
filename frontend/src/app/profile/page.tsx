"use client";

import Follow from "../components/follow/follow";
import NavBar from "../components/navBar/navBar";
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
                    {!isLoading && profile && <UserInfo user={profile.user} />}
                    {!isLoading && profile && <Follow network={profile.network} />}
                </section>
                <section className={styles.listsWrapper}></section>
            </main>
        </>
    );
}
