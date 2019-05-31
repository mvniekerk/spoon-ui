import { createStore, applyMiddleware, compose, Reducer, DeepPartial, AnyAction } from 'redux';
import { createPromise as promiseMiddleware } from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import notificationMiddleware from './notification-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

const defaultMiddlewares = [thunkMiddleware, notificationMiddleware, promiseMiddleware(), loadingBarMiddleware()];
const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...defaultMiddlewares, ...middlewares))
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = <T>(reducer: Reducer<T, AnyAction>, initialState?: DeepPartial<T>, middlewares = []) =>
  createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
