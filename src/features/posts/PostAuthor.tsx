/*=============================================================================
 PostAuthor.tsx - Post Author

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../users/usersSlice';

import { TRootState } from '../../types';

type Props = {
  userId: string
};

export const PostAuthor = ({ userId }: Props) => {
  // const author = useSelector((state: TRootState) => state.users.find(user => user.id === userId));
  const author = useSelector((state: TRootState) => selectUserById(state, userId));

  return <span>by {author ? author.name : 'Unknown author'}</span>;
}
