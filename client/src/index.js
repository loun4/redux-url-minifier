
import React from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'url';
import { unregister } from './registerServiceWorker';
import RouterService from './utils/router-service';
import Routes from './routes';

const render = (path = window.location.href) => {
  const state = {
    location: parse(path, true).pathname,
    query: parse(path, true).query,
  };

  ReactDOM.render(
    <Routes {...state} onNavigate={render} />,
    document.getElementById('root'),
  );
};

window.addEventListener('popstate', () => render());
RouterService.on('change', render);
render();
unregister();
