import {IUser} from '@/models/IUser';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginUser} from '@/store/reducers/actions/AuthActionCreators';
import {
  addFriends,
  deleteFriends,
  fetchUserFriends,
  searchFriends
} from '@/store/reducers/actions/FriendActionCreators';

interface FriendsState {
  friends: IUser[];
  isLoading: boolean;
  error: string;
  totalCount: number;
}

const initialState: FriendsState = {
  friends: [],
  isLoading: false,
  error: '',
  totalCount: 0
}

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserFriends.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.friends = action.payload;
    },
    [fetchUserFriends.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUserFriends.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [searchFriends.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.friends = action.payload.users;
      state.totalCount = action.payload.count
    },
    [searchFriends.pending.type]: (state) => {
      state.isLoading = true;
    },
    [searchFriends.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [addFriends.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.friends = state.friends.map((friend) => {
        if (friend.id === action.payload.user.id) {
          return {...friend, isFriend: true}
        }
        return friend;
      })
    },
    [addFriends.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addFriends.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [deleteFriends.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.friends = state.friends.filter(friend => friend.id !== +action.payload.friendId)
    },
    [deleteFriends.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteFriends.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    }
  }
})

export default friendsSlice.reducer;
