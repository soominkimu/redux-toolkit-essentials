/*=============================================================================
 types.d.ts - Types Declarations

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
//import { EntityState } from '@reduxjs/toolkit';

type TReaction =  // reaction type (keys constraint)
  | 'thumbsUp'
  | 'hooray'
  | 'heart'
  | 'rocket'
  | 'eyes';

type TReactionsObj = {  // reactions object to hold the counts
  [name in TReaction]: number;
};

type TUserID = string;

interface TUserState {
  id:   TUserID;
  name: string;
};

interface TPost {
  id:        string;  // nanoid(), 21 symbols "V1StGXR8_Z5jdHi6B-myT"
  date:      string;
  title:     string;  // use Partial<TPost> from the client side for { title, content, user }
  content:   string;
  user:      TUserID;
  reactions: TReactionsObj;
};

type TLoadStatus =
  | 'idle'
  | 'loading'
  | 'succeeded'
  | 'failed';

type TError = string | undefined | null;
//interface TPostState extends EntityState<TPost[]> {
interface TPostState {
  posts:     TPost[];
  status:    TLoadStatus;
  error:     TError;
};

type TNotiState = {
  id:        string;
  date:      string;
  message:   string;
  user:      TUserID;
  read:      boolean;
  isNew:     boolean;
};
