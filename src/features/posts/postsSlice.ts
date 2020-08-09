import {
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TRootState } from '../../types';

type TPostState = {
  id:      string;  // nanoid(), 21 symbols "V1StGXR8_Z5jdHi6B-myT"
  date:    string;
  title:   string;
  content: string;
  user:    string;
};

const initialState: TPostState[] = [
  { id: '1', date: '2020-08-01T15:16:33.188Z', title: 'First Post!', content: 'Hello!',    user: '0' },
  { id: '2', date: '2020-08-01T17:16:33.188Z', title: 'Second Post', content: 'More text', user: '1' }
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
            user: userId
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
    }
  }
});

export default postsSlice.reducer;

export const {
  postAdded,
  postUpdated
} = postsSlice.actions;

export const selectAllPosts = (state: TRootState) => state.posts;
export const selectPostById = (state: TRootState, postId: string) =>
    state.posts.find(post => post.id === postId);
