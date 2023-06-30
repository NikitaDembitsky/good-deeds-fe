import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'users/register',
  async (body: any, thunkAPI) => {
    try {
      const {data} = await axios.post('http://localhost:3100/users/register', body)
      return data
    } catch (e) {
      return e.response.data
    }
})


export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (body: any, thunkAPI) => {
    try {
      const { data } = await axios.put('http://localhost:3100/users', body, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userInfo = createAsyncThunk(
  'users/userInfo',
  async (body: any, thunkAPI) => {
    try {
      const { data } = await axios.get('http://localhost:3100/users/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
