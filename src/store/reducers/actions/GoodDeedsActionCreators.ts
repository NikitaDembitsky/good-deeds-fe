import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGoodDeeds = createAsyncThunk(
  'good-deeds',
  async (_, thunkAPI) => {
    try {
      const {data} = await axios.get('http://localhost:3100/good-deeds',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
      return data
    } catch (e) {
      return e.response.data
    }
  })

export const updateGoodDeed = createAsyncThunk(
  'good-deeds/update',
  async (body, thunkAPI) => {
    try {
      const {data} = await axios.put(`http://localhost:3100/good-deeds/${body.id}`, body,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
      return data
    } catch (e) {
      return e.response.data
    }
  })

export const createGoodDeed = createAsyncThunk(
  'good-deeds/create',
  async (body, thunkAPI) => {
    try {
      const {data} = await axios.post(`http://localhost:3100/good-deeds/`, body,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
      return data
    } catch (e) {
      return e.response.data
    }
  })

export const deleteGoodDeed = createAsyncThunk(
  'good-deeds/delete',
  async (body, thunkAPI) => {
    try {
      const {data} = await axios.delete(`http://localhost:3100/good-deeds/${body.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        })
      return data
    } catch (e) {
      return e.response.data
    }
  })
