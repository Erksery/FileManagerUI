import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../store/slices/errors";

export const useEditFolder = () => {
  const dispatch = useDispatch();

  const editFolder = useCallback(async (idFolder, editedFolderData) => {
    try {
      await axios.post(
        `/api/folders/editFolder/${idFolder}`,
        {
          name: editedFolderData.name,
          privacy: editedFolderData.privacy,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.error("Ошибка редактирования папки", err);
      dispatch(setError(err.response));
    }
  }, []);

  return {
    editFolder,
  };
};
