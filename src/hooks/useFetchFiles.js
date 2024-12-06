import React, { useCallback, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setError } from "../store/slices/errors";

export const useFetchFiles = (id) => {
  const [files, setFiles] = useState([]);
  const [cachedFiles, setCachedFiles] = useState({});
  const dispatch = useDispatch();

  const fetchFiles = useCallback(async () => {
    /*if (cachedFiles[id]) {
          console.log(cachedFiles);
          setFiles(cachedFiles[id]);
          return;
        }*/
    try {
      if (!navigator.onLine) {
        throw new Error("Нет подключения к интернету. Проверьте соединение.");
      }

      const authToken = localStorage.getItem("token");
      if (!authToken) {
        navigate("/login");
      }
      const filesRes = await axios.get("/api/files/getFiles", {
        params: { id },

        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setFiles(filesRes.data);
      //setCachedFiles((prev) => ({ ...prev, [id]: filesRes.data }));
    } catch (err) {
      console.log("Ошибка получения файлов", err);
      dispatch(setError(err));
    }
  }, [id]);

  return { files, setFiles, cachedFiles, setCachedFiles, fetchFiles };
};
