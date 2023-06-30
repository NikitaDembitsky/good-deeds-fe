import React, {useEffect, useState} from 'react';
import GoodDeedItem from './GoodDeedItem';
import styles from '@/styles/GoodDeedList.module.scss';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {fetchGoodDeeds} from '@/store/reducers/actions/GoodDeedsActionCreators';

interface GoodDeed {
  id: number;
  title: string;
  description: string;
}

const GoodDeedList: React.FC = () => {
  const [editDeed, setEditDeed] = useState<GoodDeed | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const {deeds, isLoading, error} = useAppSelector(state => state.goodReducer)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGoodDeeds(''))
  }, [])
  if (!deeds?.length) return <p className={styles.empty}>No good deeds yet!</p>;

  const handleEdit = (deed: GoodDeed): void => {
    setEditDeed(deed);
    setTitle(deed.title);
    setDescription(deed.description);
  };


  return (
    <ul className={styles.list}>
      {deeds.map((deed: GoodDeed) => (
        <GoodDeedItem key={deed.id} deed={deed} onUpdate={handleEdit} />
      ))}
    </ul>
  );
};

export default GoodDeedList;
