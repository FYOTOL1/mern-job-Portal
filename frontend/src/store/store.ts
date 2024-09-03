import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from 'redux-persist/lib/storage';

import companySlice from "./slices/companySlice";
import authSlice from "./slices/authSlice";
import jobSlice from "./slices/jobSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
