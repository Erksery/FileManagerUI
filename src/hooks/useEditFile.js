import React, { useCallback, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setError } from "../store/slices/errors";

export const useEditFile = () => {
  const dispatch = useDispatch();

  const editFile = useCallback(async (idFile, editedFileName) => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      navigate("/login");
    }
    try {
      await axios.post(
        `/api/files/editFile/${idFile}`,
        {
          editName: editedFileName,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (err) {
      console.error("Ошибка при редактировании файла", err);
      dispatch(setError(err.response));
    }
  }, []);

  return {
    editFile,
  };
};
