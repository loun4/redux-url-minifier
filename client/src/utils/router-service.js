
import url from 'url';

const RouterService = {
  navigate: (to, query = {}) => {
    const path = url.format({ pathname: to, query });
    window.history.pushState(null, '', path);
    return path;
  },

  replace: (to, query = {}) => {
    const path = url.format({ pathname: to, query });
    window.history.replaceState(null, '', path);
    return path;
  },
};

export default RouterService;
