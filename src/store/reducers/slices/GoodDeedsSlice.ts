import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IGoodDeed} from '@/models/IGoodDeed';
import {
  createGoodDeed,
  deleteGoodDeed,
  fetchGoodDeeds,
  updateGoodDeed
} from '@/store/reducers/actions/GoodDeedsActionCreators';

interface GoodDeedsState {
  deeds: IGoodDeed[];
  isLoading: boolean;
  error: string;
  totalCount: number
}

const initialState: GoodDeedsState = {
  deeds: [],
  isLoading: false,
  error: '',
  totalCount: 0
}

export const goodDeedsSlice = createSlice({
  name: 'goodDeeds',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGoodDeeds.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.deeds = action.payload?.items;
      state.totalCount = action.payload?.count;
    },
    [fetchGoodDeeds.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchGoodDeeds.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [updateGoodDeed.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.deeds = state.deeds.map((deed) => {
        if (deed.id === action.payload.id) {
          return {...deed, title: action.payload.title, description: action.payload.description}
        }
        return deed;
      })
    },
    [updateGoodDeed.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateGoodDeed.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [createGoodDeed.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.deeds.push(action.payload)
    },
    [createGoodDeed.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createGoodDeed.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    },
    [deleteGoodDeed.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action?.payload?.message
      state.deeds = state.deeds.filter(deed => deed.id !== +action.payload.id)
    },
    [deleteGoodDeed.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteGoodDeed.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload
    }
  }
})

export default goodDeedsSlice.reducer;
