import { useState } from 'react';
import Modal from './Modal';
import GoodDeedForm from './GoodDeedForm';
import {useAppDispatch} from '@/hooks/redux';
import {deleteGoodDeed} from '@/store/reducers/actions/GoodDeedsActionCreators';

import styles from '@/styles/GoodDeedItem.module.scss';

interface GoodDeed {
  id: number;
  title: string;
  description: string;
}

interface Props {
  deed: GoodDeed;
  onDelete: (id: number) => void;
  onUpdate: (deed: GoodDeed) => void;
}

const GoodDeedItem: React.FC<Props> = (
{ deed, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(deed.title);
  const [description, setDescription] = useState<string>(deed.description);
  const dispatch = useAppDispatch();

  const handleEdit = (): void => {
    setEditMode(true);
  };

  const handleCancel = (): void => {
    setEditMode(false);
    setTitle(deed.title);
    setDescription(deed.description);
  };

  const handleUpdate = (): void => {
    const updatedDeed: GoodDeed = { ...deed, title, description };
    onUpdate(updatedDeed);
    setEditMode(false);
  };

  const handleDelete = (): void => {
    dispatch(deleteGoodDeed({id: deed.id}))
  };

  return (
    <div className={styles.container}>
      <div className={styles.deed}>
        <h3 className={styles.title}>{deed.title}</h3>
        <p className={styles.description}>{deed.description}</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.editBtn} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </div>
      <Modal isOpen={editMode} onClose={handleCancel}>
        <GoodDeedForm
          id={deed.id}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onSave={handleUpdate}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default GoodDeedItem;
