import styles from '@/styles/Header.module.scss';
import Link from 'next/link';
import {useAppSelector} from '@/hooks/redux';

export default function LogInNav() {
  const {user} = useAppSelector(state => state.userReducer);
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <div>Home</div>
      </Link>
      <Link href="/friends">
        <div>Friends</div>
      </Link>
      <Link href="/good-deeds">
        <div>GoodDeeds</div>
      </Link>
      <Link href="/profile">
        <div>{user.name}</div>
      </Link>
      <Link href="/login">
        <div onClick={() => localStorage.removeItem('accessToken')}>Sign out</div>
      </Link>
    </nav>
  );
}
