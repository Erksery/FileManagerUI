import axios from "axios";
import React, { useCallback, useState } from "react";

export const useSearch = () => {
  const [filesList, setFilesList] = useState([]);

  const getSearchFiles = useCallback(async (searchValue, id) => {
    if (!searchValue) return; // проверка на пустое значение

    try {
      console.log("Отправка запроса:", searchValue);
      const searchRes = await axios.get("/api/search", {
        params: { searchValue: searchValue, id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFilesList(searchRes.data);
    } catch (err) {
      console.log("Error fetching files", err);
    }
  }, []);

  return {
    filesList,
    getSearchFiles,
  };
};
