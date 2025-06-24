import { useState } from "react";
import type { TrackWithReview } from '@/types/search';
import BaseModal from '../base/modal/baseModal';
import { message } from 'antd';
import { ReviewsApi } from '@/infra/api/review';
import ReviewForm from '@/app/components/review/formReview/reviewForm';
import styles from './styles.module.scss'
import { StarSelector } from "../base/starSelector/starSelector";
import { toast } from 'react-hot-toast';

interface BaseReviewProps {
  track: TrackWithReview;
}

export default function BaseReview({ track }: BaseReviewProps) {
  const initialRating = track.review?.rate || 0;
  const [rating, setRating] = useState(initialRating);
  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await ReviewsApi.createReview({
        track_id: String(track.id),
        review: {
          rate: rating,
          comment,
        }
      });
      toast.success('Review enviada com sucesso!');
      setModalOpen(false);
      setComment('');
    } catch (err) {
      toast.error('Erro ao enviar review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <StarSelector
        rating={rating}
        setRating={(star) => {
          setRating(star);
          setModalOpen(true);
        }}
        disabled={loading}
      />
      <BaseModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        okText="Enviar"
        cancelText="Cancelar"
        confirmLoading={loading}
        title="Adicione sua Avaliação"
      >
        <ReviewForm
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </BaseModal>
    </div>
  )
}
