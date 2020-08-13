/*=============================================================================
 ReactionButtons.tsx - Reaction Buttons

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useAppDispatch } from '../../app/store';
import { reactionAdded } from './postsSlice';

import {
  TPost,
  TReaction,
} from '../../types.d';

const reactionEmoji: {
  readonly [name in TReaction]: string  // index signature
} = {
  thumbsUp: '👍',
  hooray:   '🎉',
  heart:    '❤️',
  rocket:   '🚀',
  eyes:     '👀'
};

export const ReactionButtons = ({ post }: { post: TPost }) => {
  const dispatch = useAppDispatch();

  // Object to Array
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) =>
    <button
      key={name}
      type="button"
      className="muted-button reaction-button"
      onClick={() =>
        dispatch(reactionAdded({ postId: post.id, reaction: name }))
      }
    >
      {emoji} {post.reactions[name as TReaction]}
    </button>
  );

  return <div>{reactionButtons}</div>
}

