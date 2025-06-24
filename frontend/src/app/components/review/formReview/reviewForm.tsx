import { Input } from "antd";
import React from "react";
import styles from "./styles.module.scss";
import { StarSelector } from "../../base/starSelector/starSelector";

interface ReviewFormProps {
  rating: number;
  setRating: (value: number) => void;
  comment: string;
  setComment: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  rating,
  setRating,
  comment,
  setComment,
  loading,
  onSubmit,
}) => {
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={styles.rate}>
        <h3>Nota: </h3>
        <StarSelector
          rating={rating}
          setRating={setRating}
          disabled={loading}
        />
      </div>

      <textarea
        className={styles.comment}
        rows={8}
        placeholder="Escreva um comentário..."
        value={comment}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setComment(e.target.value)
        }
        maxLength={300}
        disabled={loading}
      />
    </form>
  );
};

export default ReviewForm;
