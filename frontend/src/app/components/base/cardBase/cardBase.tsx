import React, { HTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface CardBaseProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardBase: React.FC<CardBaseProps> = ({ children, className = '', ...rest }) => (
  <div className={`${styles.cardContainer} ${className}`.trim()} {...rest}>
    {children}
  </div>
);

export default CardBase;
