/*=============================================================================
 PostAuthor.tsx - Post Author

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from 'features/users/usersSlice';

import { TRootState } from 'types';

export const PostAuthor = ({ userId }: { userId: string }) => {
  // const author = useSelector((state: TRootState) => state.users.find(user => user.id === userId));
  const author = useSelector((state: TRootState) => selectUserById(state, userId));

  return <span>by {author ? author.name : 'Unknown author'}</span>;
}
