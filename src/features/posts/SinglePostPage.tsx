/*=============================================================================
 SinglePostPage.tsx - Single Post Page

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import type { RootState } from 'app/store';
import { selectPostById }  from 'features/posts/postsSlice';
import { PostAuthor }      from 'features/posts/PostAuthor';
import { TimeAgo }         from 'features/posts/TimeAgo';
import { ReactionButtons } from 'features/posts/ReactionButtons';

export const SinglePostPage = () => {
  const params = useParams<{ postId: string; }>();
  const { postId = '' } = params;

  const post = useSelector((state: RootState) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
}
