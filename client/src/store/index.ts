import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const enhancers: any[] = [];

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = (<any>window).devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const configureStore = persistedState => createStore(rootReducer, persistedState, composedEnhancers);

export default configureStore;
