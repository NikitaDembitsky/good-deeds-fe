import React, { ReactNode } from 'react';
import styles from '@/styles/Modal.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
