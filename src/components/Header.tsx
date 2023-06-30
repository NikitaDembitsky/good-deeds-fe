import Link from 'next/link';
import styles from '../styles/Header.module.scss';
import React, {useEffect, useState} from 'react';
import LogInNav from '@/components/Navigation/LogInNav';
import LogOutNav from '@/components/Navigation/LogOutNav';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (!!localStorage.getItem('accessToken')) {
      setIsLogin(true)
    }
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>GoodDeed</div>
      </Link>
      {isLogin ? <LogInNav/> : <LogOutNav/>}

    </header>
  );
};

export default Header;
