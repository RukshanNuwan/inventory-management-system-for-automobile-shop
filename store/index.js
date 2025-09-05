import { configureStore, isPlainObject } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";

const serializeMiddleware = () => (next) => (action) => {
  if (action.payload && isPlainObject(action.payload)) {
    action.payload = JSON.parse(JSON.stringify(action.payload)); // Serializes non-serializable fields
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serializeMiddleware),
});

export default store;
