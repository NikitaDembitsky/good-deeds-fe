import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserFriends = createAsyncThunk(
  'user-friends',
  async (_: any, thunkAPI) => {
    try {
      const {data} = await axios.get('http://localhost:3100/user-friends/good-deeds',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
      return data
    } catch (e) {
      return e.response.data
    }
  })

export const searchFriends = createAsyncThunk(
  'users/search',
  async (body: any, thunkAPI) => {
    try {
      const {data} = await axios.get(`http://localhost:3100/users/search?q=${body.searchValue}&page=${body.page}&size=${body.size}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
      return data
    } catch (e) {
      return e.response.data
    }
  })

export const addFriends = createAsyncThunk(
  'user-friends/add',
  async (body: any, thunkAPI) => {
    try {
      const {data} = await axios.post(`http://localhost:3100/user-friends/${body.friendId}`, body,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
      return data
    } catch (e) {
      return e.response.data
    }
  })

export const deleteFriends = createAsyncThunk(
  'user-friends/delete',
  async (body: any, thunkAPI) => {
    try {
      const {data} = await axios.delete(`http://localhost:3100/user-friends/${body.friendId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
      return data
    } catch (e) {
      return e.response.data
    }
  })
