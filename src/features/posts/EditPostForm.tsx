/*=============================================================================
 EditPostForm.tsx - Edit Post Form

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store';
import { useParams, useNavigate } from 'react-router-dom';

import {
  postUpdated,
  selectPostById
} from 'features/posts/postsSlice';
import { TRootState } from 'types.d';

export const EditPostForm = () => {
  const params = useParams<{ postId: string; }>();
  const { postId = '' } = params;

  const post = useSelector((state: TRootState) => selectPostById(state, postId));

  const [title,   setTitle]   = React.useState(post?.title);
  const [content, setContent] = React.useState(post?.content);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch( postUpdated({ id: postId, title, content }) );
      navigate(`/posts/${postId}`);
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
