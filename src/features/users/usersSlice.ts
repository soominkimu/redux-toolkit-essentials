import {
  createSlice
} from '@reduxjs/toolkit';
import { TRootState } from '../../types';

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
