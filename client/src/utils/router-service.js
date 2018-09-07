import { parse, format } from 'url';
import EventEmitter from 'events';

class RouterService extends EventEmitter {
  navigate(to, query = {}) {
    const path = format({ pathname: to, query });
    window.history.pushState(null, '', path);
    this.emit('change', path);
    return path;
  }

  replace(to, query = {}) {
    const path = format({ pathname: to, query });
    window.history.replaceState(null, '', path);
    this.emit('change', path);
    return path;
  }

  getFullPath(to, query = {}) {
    return format({ pathname: to, query });
  }

  get state() {
    const { pathname: location, query } = parse(window.location.href, true);

    return {
      currentPath: format({ pathname: location, query }),
      location,
      query,
    };
  }
}

export default new RouterService();
