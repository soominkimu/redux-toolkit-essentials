/*=============================================================================
 Navbar.tsx - Navigation Bar

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import { useAppDispatch } from './store';
import { Link } from 'react-router-dom';

import { fetchNotis } from '../features/notis/notisSlice';

export const Navbar = () => {
  const dispatch = useAppDispatch();

  const fetchNewNotis = () => {
    dispatch(fetchNotis());
  }

  return (
    <nav>
      <section>
        <h1>RTK Boilerplate</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notis">Notifications</Link>
          </div>
          <button className="button" onClick={fetchNewNotis}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
}
