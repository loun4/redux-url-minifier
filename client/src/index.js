import React from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'url';
import registerServiceWorker from './registerServiceWorker';
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

render();
registerServiceWorker();
