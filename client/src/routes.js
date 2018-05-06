
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-enroute';
import configureStore from './store';
import RouterProvider from './router-provider';
import App from './containers/app';
import Main from './containers/main';
import Admin from './containers/admin';

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
