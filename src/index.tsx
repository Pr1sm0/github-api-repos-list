import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from './store/slices/api.slice';
import { pageSlice } from './store/slices/page.slice';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    page: pageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
