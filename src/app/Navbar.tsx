/*=============================================================================
 Navbar.tsx - Navigation Bar

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
import React from 'react';
import { useAppDispatch } from 'app/store';
import { Link } from 'react-router-dom';

import { fetchNotis } from 'features/notis/notisSlice';

export const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <nav>
      <section>
        <h1>SpacetimeQ Redux Toolkit+TypeScript Boilerplate</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notis">Notifications</Link>
          </div>
            <button className="button" onClick={() => dispatch(fetchNotis())}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
}
