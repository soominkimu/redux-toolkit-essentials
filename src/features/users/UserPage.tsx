/*=============================================================================
 UserPage.tsx - User Page

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { TRootState } from '../../types.d';
import { selectUserById } from '../users/usersSlice';
import { selectAllPosts } from '../posts/postsSlice';

export const UserPage = ({ match }: RouteComponentProps<{ userId: string }>) => {
  const { userId } = match.params;

  const user = useSelector((state: TRootState) => selectUserById(state, userId));

  const postsForUser = useSelector((state: TRootState) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter(post => post.user === userId);
  });

  const postTitles = postsForUser.length > 0 ?
    postsForUser.map(post => (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>)) :
      <li>No Titles</li>;

  return (
    <section>
      <h2>{user?.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  );
}
