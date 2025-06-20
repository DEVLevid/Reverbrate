import React from 'react';
import { Modal } from 'antd';
import styles from './baseModal.module.scss';

export interface BaseModalProps {
  open: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  footer?: React.ReactNode;
  width?: number | string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onCancel,
  onOk,
  title,
  children,
  okText,
  cancelText,
  confirmLoading,
  footer,
  width = 520,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      footer={footer}
      width={width}
      className={styles.customModal}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
