import user from "./slices/userSlice";
import quiz from "./slices/quizSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [],
};

const appReducer = combineReducers({
  user,
  quiz,
});

const rootReducer = (state, action) => {
  if (action.type === "SIGNOUT_REQUEST") {
    storage.removeItem("persist:root");
    state = {};
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
