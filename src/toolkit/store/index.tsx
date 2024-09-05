import { configureStore } from '@reduxjs/toolkit';
import reducers from '../reducers';
import thunk from 'redux-thunk';

export type AppState = ReturnType<typeof reducers>;

export const store = configureStore({
  reducer: reducers(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
