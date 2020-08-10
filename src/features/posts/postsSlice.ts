/*=============================================================================
 postsSlice.ts - posts State Slice

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import {
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  TPostState,
  TRootState,
  TReaction,
} from '../../types.d';

const initialState: TPostState[] = [
  { id: '1', date: '2020-08-01T15:16:33.188Z', title: 'First Post!',
    content: 'Hello!',    user: '0',
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
  },
  { id: '2', date: '2020-08-01T17:16:33.188Z', title: 'Second Post',
    content: 'More text', user: '1' ,
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
  }
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(
        state,
        action: PayloadAction<TPostState>
      ) {
        state.push(action.payload);
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
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title   = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction as TReaction]++;
      }
    }
  }
});

export default postsSlice.reducer;

export const {
  postAdded,
  postUpdated,
  reactionAdded
} = postsSlice.actions;

export const selectAllPosts = (state: TRootState) => state.posts;
export const selectPostById = (state: TRootState, postId: string) =>
    state.posts.find(post => post.id === postId);
