import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/slices/UserSlice";
import authReducer from "./reducers/slices/AuthSlice"
import goodReducer from "./reducers/slices/GoodDeedsSlice"
import friendsReducer from "./reducers/slices/FriendsSlice"

const rootReducer = combineReducers({
  userReducer, authReducer, goodReducer, friendsReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
