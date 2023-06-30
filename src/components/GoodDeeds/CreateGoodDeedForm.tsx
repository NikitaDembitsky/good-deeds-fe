import { useState } from 'react';
import styles from '../../styles/CreateGoodDeedForm.module.scss';
import {useAppDispatch} from '@/hooks/redux';
import {createGoodDeed} from '@/store/reducers/actions/GoodDeedsActionCreators';

const CreateGoodDeedForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createGoodDeed({
      title, description
    }))
    setTitle('');
    setDescription('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button className={styles.submitBtn} type="submit">Create Good Deed</button>
    </form>
  );
};

export default CreateGoodDeedForm;
