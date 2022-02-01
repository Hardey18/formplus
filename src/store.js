import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "./slices/template";

const reducer = {
  templates: templateReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
