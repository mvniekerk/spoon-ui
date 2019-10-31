import { createStore, applyMiddleware, compose, Reducer, DeepPartial, AnyAction } from 'redux';
import { createPromise as promiseMiddleware } from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import notificationMiddleware from './notification-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const composeEnhancers = composeWithDevTools({});

const defaultMiddlewares = [thunkMiddleware, notificationMiddleware, promiseMiddleware(), loadingBarMiddleware()];
const composedMiddlewares = middlewares => composeEnhancers(applyMiddleware(...defaultMiddlewares, ...middlewares));

export const initialize = <T>(reducer: Reducer<T, AnyAction>, initialState?: DeepPartial<T>, middlewares = []) =>
  createStore(reducer, initialState, composedMiddlewares(middlewares));
