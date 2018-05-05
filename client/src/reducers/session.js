
import Client from '../connectivity/api-client';

import {
  REQUEST_AUTHENTICATION,
  FAILED_AUTHENTICATION,
  AUTHENTICATED,
  DEAUTHENTICATED,
} from '../actions/session';

export const initialState = {
  willAuthenticate: Client.getCredentials() !== null,
  isFetching: false,
  isAuthenticated: false,
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTHENTICATION:
      return {
        ...state,
        willAuthenticate: false,
        isFetching: true,
        isAuthenticated: false,
      };

    case FAILED_AUTHENTICATION:
      return {
        ...state,
        willAuthenticate: false,
        isFetching: false,
        isAuthenticated: false,
      };

    case AUTHENTICATED:
      return {
        ...state,
        willAuthenticate: false,
        isFetching: false,
        isAuthenticated: true,
      };

    case DEAUTHENTICATED:
      return {
        ...state,
        willAuthenticate: false,
        isFetching: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default session;
