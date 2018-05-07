
import Client from '../connectivity/api-client';

import {
  REQUEST_AUTHENTICATION,
  FAILED_AUTHENTICATION,
  AUTHENTICATED,
  DEAUTHENTICATED,
} from '../actions/session';

export const initialState = {
  readyToAuthenticate: Client.getCredentials() !== null,
  isFetching: false,
  isAuthenticated: false,
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTHENTICATION:
      return {
        ...state,
        readyToAuthenticate: false,
        isFetching: true,
        isAuthenticated: false,
      };

    case FAILED_AUTHENTICATION:
      return {
        ...state,
        readyToAuthenticate: false,
        isFetching: false,
        isAuthenticated: false,
      };

    case AUTHENTICATED:
      return {
        ...state,
        readyToAuthenticate: false,
        isFetching: false,
        isAuthenticated: true,
      };

    case DEAUTHENTICATED:
      return {
        ...initialState,
        readyToAuthenticate: false,
      };

    default:
      return state;
  }
};

export default session;
