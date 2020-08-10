/*=============================================================================
 ReactionButtons.tsx - Reaction Buttons

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

import {
  TPostState,
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

type Props = {
  post: TPostState;
};

export const ReactionButtons = ({ post }: Props) => {
  const dispatch = useDispatch();

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

