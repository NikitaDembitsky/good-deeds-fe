import styles from '../styles/Error.module.scss';

export default function Error({ message }) {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
}
