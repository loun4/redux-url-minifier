
import {
  REQUEST_ALL_DATA,
  RECEIVE_ALL_DATA,
  REQUEST_SAVE_DATA,
  RECEIVE_NEW_DATA,
  RECEIVE_UPDATE_DATA,
  RECEIVE_REMOVE_DATA,
} from '../actions/api';

const { REACT_APP_REST_URL: ENDPOINT } = process.env;

const Models = {
  link: data => ({
    ...data,
    get shortURL() {
      return `${ENDPOINT || ''}/link/${data.id}`;
    },
  }),
};

const initialEntityState = {
  isFetching: false,
  isSaving: false,
  models: [],
};

const initialState = {
  link: initialEntityState,
  // ... other entities
};

const entity = (
  state = initialState,
  { type, entity, data: rawData },
) => {
  const entityState = state[entity];
  const EntityModel = Models[entity];

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
          models: rawData.map(data => EntityModel(data)),
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
          models: entityState.models
            .filter(model => model.id !== rawData.id)
            .concat(EntityModel(rawData)),
        },
      };

    case RECEIVE_UPDATE_DATA:
      return {
        ...state,
        [entity]: {
          ...entityState,
          isSaving: false,
          models: entityState.models
            .map((model) => {
              if (model.id === rawData.id) { return EntityModel(rawData); }
              return model;
            }),
        },
      };

    case RECEIVE_REMOVE_DATA:
      return {
        ...state,
        [entity]: {
          ...entityState,
          isSaving: false,
          models: entityState.models
            .filter(({ id }) => id !== rawData.id),
        },
      };

    default:
      return state;
  }
};

export default entity;
