import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../store/slices/errors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(async (inputValue, e) => {
    e.preventDefault();

    try {
      const resData = await axios.post("/api/user/login", inputValue);

      localStorage.setItem("token", resData.data.token);
      if (resData.data.token) {
        navigate("/");
      }
    } catch (err) {
      console.log("Ошибка при входе в аккаунт", err);
      dispatch(setError(err.response));
    }
  }, []);
  return { login };
};
