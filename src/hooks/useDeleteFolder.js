import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFolder } from "../store/slices/folders";
import axios from "axios";

export const useDeleteFolder = () => {
  const dispatch = useDispatch();

  const deleteFolder = useCallback(
    async (idFolder) => {
      try {
        const resData = await axios.delete(
          `/api/folders/deleteFolder/${idFolder}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (resData.data && resData.data.folderId) {
          dispatch(removeFolder(resData.data.folderId));
        } else {
          console.error("Не удалось получить folderId из ответа сервера");
        }
      } catch (err) {
        console.error("Ошибка при удалении папки", err);
      }
    },
    [dispatch]
  );

  return { deleteFolder };
};
