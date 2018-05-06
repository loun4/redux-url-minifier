
export const API_GET_ERROR = 'API_GET_ERROR';
export const API_SAVE_ERROR = 'API_SAVE_ERROR';
export const API_CLEAR_ERROR = 'API_CLEAR_ERROR';

export const apiGetError = (error = {}) => ({
  type: API_GET_ERROR,
  error,
});

export const apiSaveError = (error = {}) => ({
  type: API_SAVE_ERROR,
  error,
});

export const apiClearError = () => ({
  type: API_CLEAR_ERROR,
});
