import Link from 'next/link';
import styles from '@/styles/Header.module.scss';

export default function LogOutNav() {
  return (
    <nav className={styles.nav}>
      <Link href="/login">
        <div>Login</div>
      </Link>
      <Link href="/register">
        <div>Registration</div>
      </Link>
    </nav>
  );
}
