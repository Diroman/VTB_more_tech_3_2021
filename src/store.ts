import { createBrowserHistory } from 'history';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';
import { Reducer } from 'redux';


export const history = createBrowserHistory();

const middleware = getDefaultMiddleware({ thunk: true });

const reducer = {
  router: connectRouter(history) as Reducer<RouterState>,

};

const store = configureStore({
  reducer: reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type IRootState = ReturnType<typeof store.getState>

export { store };
