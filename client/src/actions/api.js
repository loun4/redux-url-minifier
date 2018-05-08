
import Client from '../connectivity/api-client';
import { apiClearError, apiGetError, apiSaveError } from './api-errors';

export const REQUEST_ALL_DATA = 'REQUEST_ALL_DATA';
export const REQUEST_SAVE_DATA = 'REQUEST_SAVE_DATA';

export const RECEIVE_ALL_DATA = 'RECEIVE_ALL_DATA';
export const RECEIVE_NEW_DATA = 'RECEIVE_NEW_DATA';
export const RECEIVE_UPDATE_DATA = 'RECEIVE_UPDATE_DATA';
export const RECEIVE_REMOVE_DATA = 'RECEIVE_REMOVE_DATA';

const handleSaveError = dispatch => (e) => {
  dispatch(apiSaveError(e));
  setTimeout(() => dispatch(apiClearError()), 4000);
};

// Request all data, dispatch the related entity type
const requestAllData = entity => ({
  type: REQUEST_ALL_DATA,
  entity,
});

// On create, update and delete, dispatch the related entity type
const requestSaveData = entity => ({
  type: REQUEST_SAVE_DATA,
  entity,
});

// Data received, dispatch the related entity type and collection
const receiveAllData = (entity, data) => ({
  type: RECEIVE_ALL_DATA,
  entity,
  data,
});

// New entry received, dispatch the related entity type and the new entry
const receiveNewData = (entity, data) => ({
  type: RECEIVE_NEW_DATA,
  entity,
  data,
});

// Updated entry received, dispatch the related entity type and the updated entry
const receiveUpdateData = (entity, data) => ({
  type: RECEIVE_UPDATE_DATA,
  entity,
  data,
});

// Entry removed - dispatch the related entity type and the removed entry
const receiveRemoveData = (entity, data) => ({
  type: RECEIVE_REMOVE_DATA,
  entity,
  data,
});

// Public fetch action
export const fetchEntityData = ({
  entity,
  auth = false,
  query = {},
}) => (dispatch) => {
  dispatch(requestAllData(entity));

  return Client.request({
    method: 'GET',
    endpoint: entity,
    auth,
    query,
  })
    .then(data => dispatch(receiveAllData(entity, data)))
    .catch(e => dispatch(apiGetError(e)));
};

// Public save action for create and update
export const saveEntityData = ({
  entity,
  model,
  auth = false,
  query = {},
}) => (dispatch) => {
  dispatch(requestSaveData(entity));

  const updateMode = !!model.id;

  return Client.request({
    method: updateMode ? 'PUT' : 'POST',
    endpoint: updateMode ? `${entity}/${model.id}` : entity,
    body: model,
    auth,
    query,
  })
    .then((data) => {
      if (updateMode) {
        return dispatch(receiveUpdateData(entity, data));
      }
      return dispatch(receiveNewData(entity, data));
    })
    .catch(handleSaveError(dispatch));
};

// Public remove action
export const removeEntityData = ({
  entity,
  model,
  auth = true,
  query = {},
}) => (dispatch) => {
  dispatch(requestSaveData(entity));

  return Client.request({
    method: 'DELETE',
    endpoint: `${entity}/${model.id}`,
    auth,
    query,
  })
    .then(() => dispatch(receiveRemoveData(entity, model)))
    .catch(handleSaveError(dispatch));
};
