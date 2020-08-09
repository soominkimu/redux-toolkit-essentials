import { RouteComponentProps } from 'react-router-dom';
import { RootState } from './app/store';

interface MatchParams {
  postId: string;
};

export type TMatch = RouteComponentProps<MatchParams>;

export type TRootState = RootState;
