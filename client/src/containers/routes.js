import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-enroute';
import configureStore from '../store';
import RouterProvider from './router-provider';
import App from './app';
import Main from './main';
/* eslint-disable import/no-named-as-default */
import Admin from './admin';

const store = configureStore();

export default props => (
  <RouterProvider>
    <Provider store={store}>
      <Router {...props}>
        <Route path="" component={App}>
          <Route path="/" component={Main} />
          <Route path="/admin" component={Admin} />
        </Route>
      </Router>
    </Provider>
  </RouterProvider>
);
