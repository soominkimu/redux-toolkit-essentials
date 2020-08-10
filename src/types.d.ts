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

export type TPostState = {
  id:      string;  // nanoid(), 21 symbols "V1StGXR8_Z5jdHi6B-myT"
  date:    string;
  title:   string;
  content: string;
  user:    string;
  reactions: TReactionsObj;
};
