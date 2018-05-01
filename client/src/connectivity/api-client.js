
import fetch from 'cross-fetch';
import store from 'store2';
import querystring from 'querystring';

const { REACT_APP_REST_URL: ENDPOINT } = process.env;

const validateCredentials = (credentials) => {
  if (!credentials.login || !credentials.password) {
    throw new Error('credentials should include both login and password fields');
  }
};

class Client {
  setTemporaryCredentials(credentials = null) {
    if (!credentials) {
      return this;
    }

    validateCredentials(credentials);
    this.credentials = credentials;
    return this;
  }

  saveCredentials(credentials = null) {
    if (!credentials) {
      return this;
    }

    validateCredentials(credentials);
    store.session('credentials', credentials);
    this.credentials = credentials;
    return this;
  }

  getCredentials() {
    return this.credentials || store.session.get('credentials');
  }

  resetCredentials() {
    this.credentials = null;
    store.session.remove('credentials');
  }

  request({
    entity = '/', method = 'GET', auth = false, query = {},
  }) {
    return new Promise((resolve, reject) => {
      const { url, ...params } = this.parseRequestParams(entity, method, auth, query);

      fetch(url, params)
        .then((res) => {
          if (!res.ok) {
            return res.json().then(() => {
              reject({
                status: res.status,
                statusText: res.statusText,
              });
            });
          }

          return resolve(res.json());
        })
        .catch(() =>
          reject({ status: null, statusText: 'networkIssue' }));
    });
  }

  parseRequestParams(entity, method, auth, query) {
    const credentials = this.getCredentials();
    const basicAuth = auth && credentials ? {
      Authorization: `Basic ${btoa(`${credentials.login}:${credentials.password}`)}`,
    } : null;

    let url = `${ENDPOINT || '/'}${entity}`;
    if (Object.keys(query).length > 0) {
      url += `?${querystring.stringify(query)}`;
    }

    return {
      url,
      method,
      credentials: 'include',
      headers: {
        ...basicAuth,
      },
    };
  }
}

export default new Client();
