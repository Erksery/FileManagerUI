import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header/Header";
import Routers from "./Router/Routers";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { setUserData } from "./store/slices/userData";
import { Alert } from "./components/Alert/Alert";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (localStorage.getItem("token")) {
          const res = await axios.get("/api/user/getProfile", {
            params: { token: localStorage.getItem("token") },
          });

          dispatch(setUserData(res.data.userData));
        }
      } catch (err) {
        console.log("Вы не авторизованы", err);
        navigate("/login");
      }
    };
    getProfile();
  }, []);

  return (
    <>
      <Routers />
      <Alert />
    </>
  );
}

export default App;
