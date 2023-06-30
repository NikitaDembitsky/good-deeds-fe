import React, {useEffect} from 'react';
import styles from '@/styles/GoodDeedList.module.scss';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {useRouter} from 'next/router';
import {fetchUserFriends} from '@/store/reducers/actions/FriendActionCreators';
import FriendDeedItem from '@/components/GoodDeeds/FriendDeedItem';


interface GoodDeed {
  id: number;
  title: string;
  description: string;
}

const FriendDeedList: React.FC = () => {
  const {query} = useRouter()
  const {friends, isLoading, error} = useAppSelector(state => state.friendsReducer)
  const dispatch = useAppDispatch();

  const currentUser = friends.find((item) => item.tag === query.tag);
  useEffect(() => {
    dispatch(fetchUserFriends(''))
  }, [])
  if (!currentUser?.goodDeeds?.length) return <p className={styles.empty}>No good deeds yet!</p>;

  return (
    <ul className={styles.list}>
      {currentUser?.goodDeeds?.map((deed: GoodDeed) => (
        <FriendDeedItem key={deed.id} deed={deed}/>
      ))}
    </ul>
  );
};

export default FriendDeedList;
