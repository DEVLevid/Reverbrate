import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NavBar from "../components/navBar/navBar";
import ProfileContainer from "./profileContainer/ProfileContainer";

export default async function Profile() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");

    if (!token) {
        redirect("/login");
    }

    return (
        <>
            <NavBar />
            <ProfileContainer />
        </>
    );
}
