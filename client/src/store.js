
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createForms } from 'react-redux-form';
import entities from './reducers/entities';
import session from './reducers/session';
import error from './reducers/api-errors';

const loggerMiddleware = createLogger({
  predicate() { return process.env.NODE_ENV === 'development'; },
});

const forms = createForms({
  linkForm: {
    linkURL: '',
  },
  signinForm: {
    login: '',
    password: '',
  },
});

export default function configureStore(preloadedState) {
  return createStore(
    combineReducers({
      ...forms,
      entities,
      session,
      error,
    }),
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
}
