/*=============================================================================
 index.tsx - Index

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'App';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';

import { fetchUsers } from 'features/users/usersSlice';
import 'api/server';  // yarn add faker miragejs seedrandom txtgen

const root = ReactDOM.createRoot(document.getElementById('root')!);

store.dispatch(fetchUsers());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
