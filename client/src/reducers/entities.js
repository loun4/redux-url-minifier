
import {
  REQUEST_ALL_DATA,
  RECEIVE_ALL_DATA,
  REQUEST_SAVE_DATA,
  RECEIVE_NEW_DATA,
  RECEIVE_UPDATE_DATA,
  RECEIVE_REMOVE_DATA,
} from '../actions/api';

const initialEntityState = {
  isFetching: false,
  isSaving: false,
  data: [],
};

const initialStates = {
  link: initialEntityState,
};

const entity = (
  state = initialStates,
  { type, entity, data },
) => {
  const entityState = state[entity];
  switch (type) {
    case REQUEST_ALL_DATA:
      return {
        ...state,
        [entity]: {
          ...entityState,
          isFetching: true,
        },
      };

    case RECEIVE_ALL_DATA:
      return {
        ...state,
        [entity]: {
          ...entityState,
          isFetching: false,
          data,
        },
      };

    case REQUEST_SAVE_DATA:
      return {
        ...state,
        [entity]: {
          ...entityState,
          isSaving: true,
        },
      };

    case RECEIVE_NEW_DATA:
      return {
        ...state,
        [entity]: {
          ...entityState,
          isSaving: false,
          data: entityState.data.concat(data),
        },
      };

    case RECEIVE_UPDATE_DATA:
      return {
        ...state,
        [entity]: {
          ...entityState,
          isSaving: false,
          data: entityState.data.map((item) => {
            if (item.id === data.id) { return data; }
            return item;
          }),
        },
      };

    case RECEIVE_REMOVE_DATA:
      return {
        ...state,
        [entity]: {
          ...entityState,
          isSaving: false,
          data: entityState.data.filter(({ id }) => id !== data.id),
        },
      };

    default:
      return state;
  }
};

export default entity;
