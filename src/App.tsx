/*=============================================================================
 App.tsx - App mail

src
├── App.test.tsx
├── App.tsx
├── api
│   ├── client.js
│   └── server.js
├── app
│   ├── Navbar.tsx
│   ├── localStorage.ts
│   └── store.ts
├── features
│   ├── notis
│   │   ├── NotisList.tsx
│   │   └── notisSlice.ts        : notis slice
│   ├── posts
│   │   ├── AddPostForm.tsx
│   │   ├── EditPostForm.tsx
│   │   ├── PostAuthor.tsx
│   │   ├── PostsList.tsx
│   │   ├── ReactionButtons.tsx
│   │   ├── SinglePostPage.tsx
│   │   ├── TimeAgo.tsx
│   │   └── postsSlice.ts        : posts slice
│   └── users
│       ├── UserPage.tsx
│       ├── UsersList.tsx
│       └── usersSlice.ts        : users slice
├── index.scss
├── index.tsx
├── react-app-env.d.ts
├── serviceWorker.ts
├── setupTests.ts
└── types.d.ts

 by Soomin K.
 (C) 2020 SPACETIMEQ INC.
=============================================================================*/
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
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
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/"
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
    </BrowserRouter>
  );
}

export default App;
