/*=============================================================================
 UserPage.tsx - User Page

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { TRootState, TUserID, TUserState } from '../../types.d';
import { selectUserById }    from '../users/usersSlice';
import { selectPostsByUser } from '../posts/postsSlice';

export const UserPage = ({ match }: RouteComponentProps<{ userId: TUserID }>) => {
  const { userId } = match.params;

  const user = useSelector((state: TRootState) => selectUserById(state, userId)) as TUserState;

  /*
  const postsForUser = useSelector((state: TRootState) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter(post => post.user === userId);
  });
   */
  const postsForUser = useSelector((state: TRootState) => selectPostsByUser(state, userId));

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
