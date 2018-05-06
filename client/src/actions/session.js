
import { actions } from 'react-redux-form';
import { apiClearError } from './api-errors';

import Client from '../connectivity/api-client';

export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION';
export const FAILED_AUTHENTICATION = 'FAILED_AUTHENTICATION';
export const AUTHENTICATED = 'AUTHENTICATED';
export const DEAUTHENTICATED = 'DEAUTHENTICATED';

const requestAuthentication = () => ({
  type: REQUEST_AUTHENTICATION,
});

const failedAuthentication = () => ({
  type: FAILED_AUTHENTICATION,
});

const authenticated = () => ({
  type: AUTHENTICATED,
});

const deauthenticated = () => ({
  type: DEAUTHENTICATED,
});

export const authenticate = (credentials = null) => (dispatch) => {
  dispatch(apiClearError());
  dispatch(requestAuthentication());
  dispatch(actions.setPending('signinForm', true));

  const req = Client.setTemporaryCredentials(credentials)
    .request({
      endpoint: 'authentication',
      method: 'POST',
      auth: true,
    })
    .then(() => {
      dispatch(authenticated());
      Client.saveCredentials(credentials);
    })
    .catch((e) => {
      Client.resetCredentials();
      dispatch(failedAuthentication());
      throw e;
    });

  dispatch(actions.submit('signinForm', req));
  return req;
};

export const deauthenticate = () => (dispatch) => {
  Client.resetCredentials();
  dispatch(apiClearError());
  dispatch(deauthenticated());
};
