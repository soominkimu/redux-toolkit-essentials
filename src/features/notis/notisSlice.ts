/*=============================================================================
 notisSlice.ts - Notifications State Slice

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';

import { TRootState, TNotiState } from 'types.d';

import { client } from 'api/client';

const notisAdapter = createEntityAdapter<TNotiState>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

export const fetchNotis = createAsyncThunk<
  TNotiState[]
>(
  'notis/fetchNotis',
  async (_, { getState }) => {
    const allNotis = selectAllNotis(getState() as TRootState);
    const [latestNoti] = allNotis;
    const latestTimestamp = latestNoti ? latestNoti.date : '';
    const response = await client.get(`/fakeApi/notis?since=${latestTimestamp}`);
    return response.notis; // as Promise<TNotiState[]>;
  }
);

/*
const initialState
[
{
  id:   '0',
  date: '2020-08-08T15:16:33.188Z',
  message: "かくとだに えやは伊吹の さしも草 さしも知らじな 燃ゆる思ひを",
  user: '0',
  read:  true,
  isNew: true
},
{
  id:   '1',
  date: '2020-08-11T15:16:33.188Z',
  message: "あけぬれば 暮るるものとは 知りながら なほ恨めしき 朝ぼらけかな",
  user: '1',
  read:  false,
  isNew: true
}
];
*/
const notisSlice = createSlice({
  name: 'notis',
  initialState: notisAdapter.getInitialState(),
  reducers: {
    allNotisRead(state, action) {
      // state.forEach(noti => { noti.read = true; });
      Object.values(state.entities).forEach(noti => {
        noti!.read = true;
      });
    }
  },
  extraReducers: builder => {
    builder
    .addCase(fetchNotis.fulfilled, (state, action) => {
      /*
      state.forEach(noti => { noti.isNew = !noti.read; });
      state.push(...action.payload);
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date));
      */
      Object.values(state.entities).forEach(noti => {
        noti!.isNew = !noti!.read;
      });
      notisAdapter.upsertMany(state, action.payload);
    })
  }
});

export const { allNotisRead } = notisSlice.actions;

export default notisSlice.reducer;

//export const selectAllNotis = (state: TRootState) => state.notis;
export const {
  selectAll: selectAllNotis
} = notisAdapter.getSelectors((state: TRootState) => state.notis);
