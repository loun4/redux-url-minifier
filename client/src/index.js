import React from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'url';
import { unregister } from './registerServiceWorker';
import RouterService from './utils/router-service';
import Routes from './containers/routes';

const render = (path = window.location.href) => {
  const state = {
    location: parse(path, true).pathname,
    query: parse(path, true).query,
  };

  ReactDOM.render(<Routes {...state} />, document.getElementById('root'));
};

window.addEventListener('popstate', () => render());
RouterService.on('change', render);
render();
unregister();
