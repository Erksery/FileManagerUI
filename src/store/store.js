import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "./slices/folders";
import menuReducer from "./slices/menu";
import userDataReducer from "./slices/userData";
import errorReducer from "./slices/errors";

export const store = configureStore({
  reducer: {
    folders: foldersReducer,
    menu: menuReducer,
    userData: userDataReducer,
    error: errorReducer,
  },
});
