import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addFolders, setFolders } from "../store/slices/folders";
import { useNavigate } from "react-router-dom";
import { setError } from "../store/slices/errors";

export const useFetchFolders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchFolders = useCallback(async () => {
    try {
      if (!navigator.onLine) {
        throw new Error("Нет подключения к интернету. Проверьте соединение.");
      }

      const authToken = localStorage.getItem("token");
      if (!authToken) {
        return navigate("/login");
      }

      const foldersRes = await axios.get("/api/folders/getFolders", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      dispatch(setFolders(foldersRes.data));
    } catch (err) {
      console.log("Ошибка при получении папок", err);
      dispatch(setError(err.message || "Произошла ошибка при получении папок"));
    }
  }, [dispatch, navigate]);

  return { fetchFolders };
};
