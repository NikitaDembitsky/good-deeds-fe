import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/GoodDeedForm.module.scss';
import {useAppDispatch} from '@/hooks/redux';
import {updateGoodDeed} from '@/store/reducers/actions/GoodDeedsActionCreators';

interface Props {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const GoodDeedForm: React.FC<Props> = ({ id, title, description, setTitle, setDescription, onSave, onCancel }) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(updateGoodDeed({
      id,
      title,
      description
    }))
    if (title.trim() && description.trim()) {
      setIsValid(true);
      onSave();
    } else {
      setIsValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {!isValid && <p className={styles.error}>Please fill in both fields.</p>}
      <div className={styles.field}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} required />
      </div>
      <div className={styles.buttons}>
        <button type="submit" className={styles.saveBtn}>
          Save
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

GoodDeedForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default GoodDeedForm;
