import styles from "./styles.module.scss";

interface ItemProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}

export default function Item({ children, variant = "primary"}: ItemProps) {
    return (
        <li className={styles.item} data-variant={variant}>
            {children}
        </li>
    );
}