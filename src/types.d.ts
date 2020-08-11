/*=============================================================================
 types.d.ts - Types Declarations

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import { RootState } from './app/store';

export type TRootState = RootState;

export type TReaction =  // reaction type (keys constraint)
  | 'thumbsUp'
  | 'hooray'
  | 'heart'
  | 'rocket'
  | 'eyes';

export type TReactionsObj = {  // reactions object to hold the counts
  [name in TReaction]: number;
};

export type TUserID = string;

export interface TUserState {
  id:   TUserID;
  name: string;
};

export interface TPost {
  id:        string;  // nanoid(), 21 symbols "V1StGXR8_Z5jdHi6B-myT"
  date:      string;
  title:     string;  // use Partial<TPost> from the client side for { title, content, user }
  content:   string;
  user:      TUserID;
  reactions: TReactionsObj;
};

export type TLoadStatus =
  | 'idle'
  | 'loading'
  | 'succeeded'
  | 'failed';

export type TPostState = {
  posts:     TPost[];
  status:    TLoadStatus;
  error:     string | undefined | null;
};

export type TNotiState = {
  id:        string;
  date:      string;
  message:   string;
  user:      TUserID;
  read:      boolean;
  isNew:     boolean;
};
