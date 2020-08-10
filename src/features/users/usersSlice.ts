/*=============================================================================
 usersSlice.ts - users State Slice

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import {
  createSlice
} from '@reduxjs/toolkit';
import { TRootState } from '../../types.d';

type TUserState = {
  id:   string;
  name: string;
};

const initialState: TUserState[] = [
  { id: '0', name: 'Soomin K' },
  { id: '1', name: 'Tianna Jenkins' },
  { id: '2', name: 'Kevin Grant' },
  { id: '3', name: 'Madison Price' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
});

export default usersSlice.reducer;

export const selectAllUsers = (state: TRootState) => state.users;
