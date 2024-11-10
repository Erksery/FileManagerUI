import axios from "axios";
import React, { useCallback, useState } from "react";

export const useEditFolder = () => {
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
    }
  }, []);

  return {
    editFolder,
  };
};
