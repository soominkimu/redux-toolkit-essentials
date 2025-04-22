/*=============================================================================
 App.tsx - App main

src (tree)
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

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Navbar }         from 'app/Navbar';
import { AddPostForm }    from 'features/posts/AddPostForm';
import { EditPostForm }   from 'features/posts/EditPostForm';
import { PostsList }      from 'features/posts/PostsList';
import { SinglePostPage } from 'features/posts/SinglePostPage';
import { UsersList }      from 'features/users/UsersList';
import { UserPage }       from 'features/users/UserPage';
import { NotisList }      from 'features/notis/NotisList';

function App() {
  console.log("App()");

  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/"
            element={
            <>
              <AddPostForm />
              <PostsList />
            </>}
          />
          <Route path="/posts/:postId"    element={<SinglePostPage />} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
          <Route path="/users"            element={<UsersList />} />
          <Route path="/users/:userId"    element={<UserPage />} />
          <Route path="/notis"            element={<NotisList />} />
          <Route path="/"                 element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
