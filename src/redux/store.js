import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { campersReducer } from './campers/slice.js';
// import { authReducer } from './auth/slice';
// import { settingsReducer } from './settings/slice';
// import { waterReducer } from './water/slice';

const persistConfig = {
  key: 'favoriteCampers',
  storage,
  whitelist: ['favoriteCampers'],
};

export const store = configureStore({
  reducer: {
    campers: persistReducer(persistConfig, campersReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
