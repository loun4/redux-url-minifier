
import {
  API_GET_ERROR,
  API_SAVE_ERROR,
  API_CLEAR_ERROR,
} from '../actions/api-errors';

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
      return {};
    default:
      return state;
  }
};

export default apiErrors;
