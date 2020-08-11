import { useDispatch } from 'react-redux';
import {
  configureStore,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import notisReducer from '../features/notis/notisSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notis: notisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
