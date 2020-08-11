/*=============================================================================
 postsSlice.ts - posts State Slice

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { client } from '../../api/client';

import {
  TPost,
  TPostState,
  TRootState,
  TReaction,
} from '../../types.d';

const initialState: TPostState = {
  posts: [
  { id: '1', date: '2020-08-21T15:16:33.188Z', title: 'わすれじの ゆくすゑ(え)までは かたければ',
    content: '忘れじの 行く末までは 難ければ 今日を限りの 命ともがな',    user: '0',
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
  },
  { id: '2', date: '2020-08-31T17:16:33.188Z', title: 'なげきつつ ひとりぬるよの あくるまは',
    content: '歎きつつ ひとり寝る夜の 明くる間は いかに久しき ものとかは知る', user: '1' ,
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
  }],
/*
  status: 'succeeded',
  error: null
*/
  status: 'idle',
  error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.posts;
});

// The payload creator receives the partial '{title, content, user}' object
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: Partial<TPost>) => {
  const response = await client.post('/fakeApi/posts', { post: initialPost });
  // The response includes the complte post object, including unique ID
  return response.post;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<TPost>) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
          }
        };
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title   = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction as TReaction]++;
      }
    }
  },
  extraReducers: builder => {
    builder
    .addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload);
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    })
  }
});

export default postsSlice.reducer;

export const {
  postAdded,
  postUpdated,
  reactionAdded
} = postsSlice.actions;

export const selectAllPosts = (state: TRootState) => state.posts.posts;
export const selectPostById = (state: TRootState, postId: string) =>
    state.posts.posts.find(post => post.id === postId);
export const selectPostStatus = (state: TRootState) => state.posts.status;
export const selectPostError  = (state: TRootState) => state.posts.error;
