/*=============================================================================
 notisSlice.ts - Notifications State Slice

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';

import { TRootState, TNotiState } from '../../types.d';

import { client } from '../../api/client';

export const fetchNotis = createAsyncThunk<
  TNotiState[]
>('notis/fetchNotis',
  async (_, { getState }) : Promise<TNotiState[]> => {
    const allNotis = selectAllNotis(getState() as TRootState);
    const [latestNoti] = allNotis;
    const latestTimestamp = latestNoti ? latestNoti.date : '';
    const response = await client.get(`/fakeApi/notis?since=${latestTimestamp}`);
    return response.notis as TNotiState[];
  }
);

const initialState: TNotiState[] = [
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

const notisSlice = createSlice({
  name: 'notis',
  initialState,
  reducers: {
    allNotisRead(state, action) {
      state.forEach(noti => {
        noti.read = true;
      });
    }
  },
  extraReducers: builder => {
    builder
    .addCase(fetchNotis.fulfilled, (state, action) => {
      state.forEach(noti => {
        noti.isNew = !noti.read;
      });
      state.push(...action.payload);
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date));
    })
  }
});

export const { allNotisRead } = notisSlice.actions;

export default notisSlice.reducer;

export const selectAllNotis = (state: TRootState) => state.notis;
