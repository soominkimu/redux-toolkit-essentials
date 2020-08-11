/*=============================================================================
 App.tsx - App mail

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { Navbar }         from './app/Navbar';
import { AddPostForm }    from './features/posts/AddPostForm';
import { EditPostForm }   from './features/posts/EditPostForm';
import { PostsList }      from './features/posts/PostsList';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { UsersList }      from './features/users/UsersList';
import { UserPage }       from './features/users/UserPage';
import { NotisList }      from './features/notis/NotisList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddPostForm />
                <PostsList />
              </>
            )}
          />
          <Route exact path="/posts/:postId"    component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/users"            component={UsersList} />
          <Route exact path="/users/:userId"    component={UserPage} />
          <Route exact path="/notis"            component={NotisList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
