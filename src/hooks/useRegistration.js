import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../store/slices/errors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registration = useCallback(async (inputValue, e) => {
    e.preventDefault();

    try {
      const resData = await axios.post("/api/user/registration", inputValue);

      localStorage.setItem("token", resData.data.token);
      if (resData.data.token) {
        navigate("/");
      }
    } catch (err) {
      console.log("Ошибка при регистрации", err);
      dispatch(setError(err.response));
    }
  }, []);
  return { registration };
};
