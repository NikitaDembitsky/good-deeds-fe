import React, {useEffect, useState} from 'react';
import styles from '../styles/FriendList.module.scss';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {
  addFriends,
  deleteFriends,
  fetchUserFriends,
  searchFriends
} from '@/store/reducers/actions/FriendActionCreators';
import {clearTimeout, setTimeout} from 'timers';
import Link from 'next/link';

const FriendList = () => {
  const [searchText, setSearchText] = useState('');
  const {friends, totalCount} = useAppSelector((state) => state.friendsReducer);
  const [isValid, setIsValid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserFriends(''))
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsValid(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isValid]);

  useEffect(() => {
    if (!isValid) {
      dispatch(
        searchFriends({
          searchValue: searchText,
          page: currentPage,
          size: pageSize
        })
      );
    }
  }, [isValid, currentPage, pageSize]);

  const handleInputChange = (event) => {
    setIsValid(true);
    setSearchText(event.target.value);
  };

  const handleAddFriend = (friend) => {
    dispatch(addFriends({friendId: friend.id}));
  };

  const handleRemoveFriend = (friend) => {
    dispatch(deleteFriends({friendId: friend.id}));
  };

  const handlePageChange = (page) => {
    const totalPages = Math.ceil(totalCount / pageSize);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.friendList}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search by tag"
            value={searchText}
            onChange={handleInputChange}
          />
        </div>
        <ul className={styles.list}>
          {friends?.map((friend) => (
            <li
              key={friend.id}
              className={`${styles.item} ${friend.isFriend ? styles.friend : ''}`}
            >
              <Link href={`friends/${friend.tag}`}>
                <div className={styles.name}>{friend.name}</div>
              </Link>
              <div className={styles.tag}>@{friend.tag}</div>
              {friend.isFriend ? (
                <button
                  className={`${styles.removeButton} ${styles.actionButton}`}
                  onClick={() => handleRemoveFriend(friend)}
                >
                  Remove Friend
                </button>
              ) : (
                <button
                  className={`${styles.addButton} ${styles.actionButton}`}
                  onClick={() => handleAddFriend(friend)}
                >
                  Add Friend
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous Page
          </button>
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
