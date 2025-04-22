/*=============================================================================
 usersSlice.ts - users State Slice

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { client } from 'api/client';
import type { RootState } from 'app/store';

const usersAdapter = createEntityAdapter<TUserState>();

/*
const initialState =
[
  { id: '0', name: '儀同三司母' },
  { id: '1', name: '右大将道綱母' },
  { id: '2', name: 'Soomin K' },
  { id: '3', name: '清少納言' },
];
*/

export const fetchUsers = createAsyncThunk<
  TUserState[]
>(
  'users/fetchUsers',
  async () => {
    const response = await client.get('/fakeApi/users');
    return response.users;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
  /*
      console.log(action.payload);
      return action.payload;
  */
      usersAdapter.setAll(state, action);
    })
  }
});

export default usersSlice.reducer;

/*
export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId: string) =>
  state.users.find(user => user.id === userId);
*/
export const {
  selectAll:  selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state: RootState) => state.users);
