// amazingblogapp/blognews-frontend/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import articleReducer from './articleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
  },
});
