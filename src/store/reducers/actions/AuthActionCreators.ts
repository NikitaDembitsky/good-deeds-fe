import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (body: any, thunkAPI) => {
    try {
      const {data} = await axios.post('http://localhost:3100/auth/login', body)
      return data
    } catch (e) {
      return e.response.data
    }
  })
