import React, { useCallback, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setError } from "../store/slices/errors";

export const useDeleteFile = (id, setFiles) => {
  const dispatch = useDispatch();

  const deleteFile = useCallback(async (idFile) => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      navigate("/login");
    }
    try {
      const resData = await axios.delete(`/api/files/deleteFile/${idFile}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (resData.data) {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== idFile));
      } else {
        console.error("Не удалось получить данные с сервера");
      }
    } catch (err) {
      console.error("Error deleting file", err);
      dispatch(setError(err.response));
    }
  }, []);

  return {
    deleteFile,
  };
};
