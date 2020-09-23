/*=============================================================================
 NotisList.tsx - Notifications List

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { selectAllUsers } from '../users/usersSlice';
import {
  selectAllNotis,
  allNotisRead
} from './notisSlice';

export const NotisList = () => {
  const dispatch = useAppDispatch();
  const notis = useSelector(selectAllNotis);
  const users = useSelector(selectAllUsers);

  React.useEffect(() => {
    dispatch(allNotisRead({}));
  });

  const renderedNotis = notis.map(noti => {
    const date = parseISO(noti.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find(user => user.id === noti.user) || { name: 'Unknown User' };

    return (
      <div className={'noti' + (noti.isNew ? ' new' : '')} key={noti.id}>
        <div>
          <b>{user.name}</b> {noti.message}
        </div>
        <div title={noti.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notisList">
      <h2>Notifications</h2>
      {renderedNotis}
    </section>
  );
}
