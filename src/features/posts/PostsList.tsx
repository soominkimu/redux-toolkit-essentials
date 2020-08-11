/*=============================================================================
 PostsList.tsx - Posts List

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import { Link } from 'react-router-dom';

import { PostAuthor }      from './PostAuthor';
import { TimeAgo }         from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

import { TRootState, TPost } from '../../types.d';

import {
  selectPostIds,
  selectPostById,
  selectPostStatus,
  selectPostError,
  postUpdated,  // for debugging
  fetchPosts
} from './postsSlice';

const PostExcerpt = ({ postId }: { postId: string | number }) => {
  const post = useSelector((state: TRootState) => selectPostById(state, postId)) as TPost;
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
}

export const PostsList = () => {
  const dispatch = useAppDispatch();
  //const posts = useSelector(selectAllPosts);
  const orderedPostIds = useSelector(selectPostIds);

  const postStatus = useSelector(selectPostStatus);
  const postError  = useSelector(selectPostError);

  React.useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === 'succeeded') {
    //const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPostIds.map(postId =>
      <PostExcerpt postId={postId} key={postId} />
    );
  } else if (postStatus === 'failed') {
    content = <div>{postError}</div>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}

console.log(
  postUpdated({ id: '123', title: 'First Post', content: 'Some text here' })
);
