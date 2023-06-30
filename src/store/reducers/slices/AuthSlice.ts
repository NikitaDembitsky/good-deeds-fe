import {IUser} from '@/models/IUser';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginUser} from '@/store/reducers/actions/AuthActionCreators';

interface UserState {
  users: IUser;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: {
    id: 1,
    name: '',
    email: ''
  },
  isLoading: false,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.users = action.payload;
      console.log(action.payload)
      if (action.payload.access_token) {
        localStorage.setItem('accessToken', action.payload.access_token)
      }
    },
    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    }
  }
})

export default authSlice.reducer;
