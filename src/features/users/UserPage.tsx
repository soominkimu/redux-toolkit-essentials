/*=============================================================================
 UserPage.tsx - User Page

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import type { RootState } from 'app/store';
import { selectUserById }    from 'features/users/usersSlice';
import { selectPostsByUser } from 'features/posts/postsSlice';

export const UserPage = () => {
  const params = useParams<{ userId: string; }>();
  const { userId = '' } = params;

  const user = useSelector((state: RootState) => selectUserById(state, userId)) as TUserState;

  /*
  const postsForUser = useSelector((state: TRootState) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter(post => post.user === userId);
  });
   */
  const postsForUser = useSelector((state: RootState) => selectPostsByUser(state, userId));

  const postTitles = postsForUser.length > 0 ?
    postsForUser.map(post => (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>)) :
      <li>No Titles</li>;

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  );
}
