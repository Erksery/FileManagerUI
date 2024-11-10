import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFolders } from "../store/slices/folders";

export const useCreateFolder = () => {
  const [folderData, setFolderData] = useState({});
  const dispatch = useDispatch();
  const apiUrl = "/api/folders/createFolder";

  const createFolder = async ({ id, name }) => {
    try {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      const res = await axios.post(
        url,
        { name: name ? name : "Новая папка" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Проверяем наличие ID папки
      if (!res.data.folder?.id) {
        console.error("ID папки не получен из ответа API:", res.data);
        throw new Error("ID папки не был возвращён.");
      }

      dispatch(addFolders([res.data.folder]));
      setFolderData(res.data);
      return res.data.folder.id;
    } catch (err) {
      console.error("Ошибка при создании папки:", err);
      throw err;
    }
  };

  return {
    createFolder,
    folderData,
  };
};
