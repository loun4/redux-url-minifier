import {
  API_GET_ERROR,
  API_SAVE_ERROR,
  API_CLEAR_ERROR,
} from '../actions/api-errors';

import { DEAUTHENTICATED } from '../actions/session';

const apiErrors = (state = {}, action) => {
  switch (action.type) {
    case API_GET_ERROR:
      return {
        ...action.error,
        type: 'get',
      };
    case API_SAVE_ERROR:
      return {
        ...action.error,
        type: 'save',
      };
    case API_CLEAR_ERROR:
    case DEAUTHENTICATED:
      return {};
    default:
      return state;
  }
};

export default apiErrors;
