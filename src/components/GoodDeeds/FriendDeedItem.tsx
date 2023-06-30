import styles from '@/styles/FriendDeedItem.module.scss';
import React from 'react';

const FriendDeedItem = ({deed}) => {
  return (
    <div className={styles.container}>
      <div className={styles.deed}>
        <h3 className={styles.title}>Title: {deed.title}</h3>
        <p className={styles.description}>Description: {deed.description}</p>
      </div>
    </div>
  );
};

export default FriendDeedItem;
