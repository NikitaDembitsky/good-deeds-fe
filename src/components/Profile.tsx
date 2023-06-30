import React, {useEffect, useMemo, useState} from 'react';
import Head from 'next/head';
import styles from '../styles/Profile.module.scss';
import Header from './Header';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {updateUser, userInfo} from '@/store/reducers/actions/UserActionCreators';

const Profile = () => {
  const {user} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const [tag, setTag] = useState(user.tag);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const saveChanges = async () => {
    await dispatch(updateUser({
      tag, email, name
    }))
    setEmail(email);
    setTag(tag);
    setName(name);
  };

  useEffect(() => {
    dispatch(userInfo(''));
  }, []);

  useMemo(() => {
    setTag(user.tag);
    setEmail(user.email);
    setName(user.name);
  }, [user])

  const discardChanges = () => {
    setTag(user.tag);
    setEmail(user.email);
    setName(user.name);
  };

  return (
    <>
      <Head>
        <title>Personal Profile</title>
      </Head>
      <div className={styles.wrapper}>
        <Header/>
        <div className={styles.formWrapper}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h2>Personal Profile</h2>
            </div>
            <div className={styles.body}>
              <div className={styles.field}>
                <label htmlFor="tag">Tag:</label>
                <input
                  type="text"
                  id="tag"
                  value={tag}
                  onChange={(e: any) => setTag(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              </div>
              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={saveChanges}>
                  Save
                </button>
                <button className={styles.discardBtn} onClick={discardChanges}>
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
