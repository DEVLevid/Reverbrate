import { InfoIcon } from "@phosphor-icons/react";
import styles from "./styles.module.scss";
import { redirect } from "next/navigation";

export default function Error() {
    return (
        <section className={styles.container}>
            <InfoIcon size={80} color="#780000" />
            <h3 className={styles.title}>Erro!</h3>
            <p className={styles.description}>
                Pedimos desculpa pelo inconveniente. A página que está a tentar
                aceder encontrou um erro. Por favor, tente novamente mais tarde.
            </p>
            <button onClick={() => redirect("/")}>Voltar para a Home</button>
        </section>
    );
}
