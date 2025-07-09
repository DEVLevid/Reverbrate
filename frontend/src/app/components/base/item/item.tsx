import styles from "./styles.module.scss";

interface ItemProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    key: string;
}

export default function Item({ children, variant = "primary", key }: ItemProps) {
    return (
        <li key={key} className={styles.item} data-variant={variant}>
            {children}
        </li>
    );
}