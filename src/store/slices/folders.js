import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [],
  activeFolder: null,
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolders: (state, action) => {
      state.folders = [...state.folders, ...action.payload];
    },
    setFolders: (state, action) => {
      state.folders = [...action.payload];
    },

    setActiveFolder: (state, action) => {
      state.activeFolder = action.payload;
    },

    removeFolder: (state, action) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
    },
  },
});

export const { addFolders, setFolders, removeFolder, setActiveFolder } =
  foldersSlice.actions;

export default foldersSlice.reducer;
