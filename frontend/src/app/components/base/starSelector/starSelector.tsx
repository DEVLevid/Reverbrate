import { Star } from "@phosphor-icons/react";
import React, { useState } from "react";
import styles from "./styles.module.scss";

export const StarSelector: React.FC<{
  rating: number;
  setRating: (value: number) => void;
  disabled?: boolean;
  disableHover?: boolean;
}> = ({ rating, setRating, disabled, disableHover }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            `${styles.star} ` +
            ((hover || rating) >= star ? styles.filled : styles.unfilled)
          }
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          onClick={() => !disabled && setRating(star)}
          onMouseEnter={() => !disabled && !disableHover && setHover(star)}
          onMouseLeave={() => !disabled && !disableHover && setHover(0)}
          tabIndex={0}
          role="button"
          aria-label={`Dar nota ${star}`}
          onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) setRating(star);
          }}
        >
          <Star
            size={22}
            weight={(hover || rating) >= star ? "fill" : "regular"}
            color={(hover || rating) >= star ? "#FFD700" : "#ccc"}
          />
        </span>
      ))}
    </div>
  );
};
