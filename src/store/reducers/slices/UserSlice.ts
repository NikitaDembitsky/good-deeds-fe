import {IUser} from '@/models/IUser';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {registerUser, updateUser, userInfo} from '@/store/reducers/actions/UserActionCreators';

interface UserState {
  user: IUser;
  isLoading: boolean;
  error: string;
  registrationStatus: boolean
}

const initialState: UserState = {
  user: {
    id: 1,
    name: '',
    email: '',
    tag: ''
  },
  isLoading: false,
  error: '',
  registrationStatus: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.user = action.payload;
      state.registrationStatus = !!action.payload.token;
    },
    [registerUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.user = action.payload;
    },
    [updateUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateUser.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [userInfo.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.user = action.payload.user;
    },
    [userInfo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [userInfo.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    }
  }
})

export default userSlice.reducer;
