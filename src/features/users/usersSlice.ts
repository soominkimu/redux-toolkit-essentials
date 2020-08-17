/*=============================================================================
 usersSlice.ts - users State Slice

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { TRootState, TUserState } from '../../types.d';

const usersAdapter = createEntityAdapter<TUserState>();

const initialState = usersAdapter.getInitialState();
/*
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
  initialState,
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
export const selectAllUsers = (state: TRootState) => state.users;
export const selectUserById = (state: TRootState, userId: string) =>
  state.users.find(user => user.id === userId);
*/
export const {
  selectAll:  selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state: TRootState) => state.users);
