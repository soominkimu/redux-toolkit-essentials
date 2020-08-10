/*=============================================================================
 EditPostForm.tsx - Edit Post Form

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  postUpdated,
  selectPostById
} from './postsSlice';
import { TMatch, TRootState } from '../../types';

export const EditPostForm = ({ match }: TMatch) => {
  const { postId } = match.params;

  const post = useSelector((state: TRootState) => selectPostById(state, postId));

  const [title,   setTitle]   = React.useState(post?.title);
  const [content, setContent] = React.useState(post?.content);

  const dispatch = useDispatch();
  const history  = useHistory();

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch( postUpdated({ id: postId, title, content }) );
      history.push(`/posts/${postId}`);
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
}
