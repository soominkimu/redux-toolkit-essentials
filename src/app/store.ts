/*=============================================================================
 store.ts - Store Root

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/

import { useDispatch } from 'react-redux';
import {
  configureStore,
//  ThunkAction,
//  Action
} from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import notisReducer from '../features/notis/notisSlice';

/*
import {
  loadPersistState,
  savePersistState
} from './localStorage';
export const preloadedState = loadPersistState();

store.subscribe(() => {
  savePersistState(store.getState());
});
*/

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notis: notisReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
/*
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
*/

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
