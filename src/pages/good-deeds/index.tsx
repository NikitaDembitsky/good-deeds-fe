import React from 'react';
import GoodDeedList from '@/components/GoodDeeds/GoodDeedList';
import CreateGoodDeedForm from '@/components/GoodDeeds/CreateGoodDeedForm';
import Header from '@/components/Header';
import styles from '@/styles/GoodDeedList.module.scss'

export default function GoodDeedsPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <CreateGoodDeedForm />
      <GoodDeedList />
    </div>
  )
}
