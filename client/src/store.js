
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createForms } from 'react-redux-form';
import entities from './reducers/entities';

const loggerMiddleware = createLogger({
  predicate() { return process.env.NODE_ENV === 'development'; },
});

const forms = createForms({
  shortenerForm: {
    linkURL: '',
  },
});

export default function configureStore(preloadedState) {
  return createStore(
    combineReducers({
      ...forms,
      ...entities,
    }),
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
}
