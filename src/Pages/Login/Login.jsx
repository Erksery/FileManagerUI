import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Login.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../../components/AuthContainer/AuthContainer";

function Login() {
  const [inputValue, setInputValue] = useState({ login: "", password: "" });
  const navigate = useNavigate();

  const logSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/api/user/login", { params: inputValue });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.log("Ошибка входе в аккаунт", err);
    } finally {
    }
  };

  return (
    <>
      <AuthContainer>
        <form onSubmit={logSubmit} className={styles.logContainer}>
          <p className={styles.pageName}>Авторизация</p>
          <h1>Добро пожаловать!</h1>
          <p>
            Нету аккаунта? <Link to={"/registration"}>Зарегистрируйся</Link>
          </p>
          <div className={styles.inputContainer}>
            <input
              value={inputValue.login}
              onChange={(e) =>
                setInputValue({ ...inputValue, login: e.target.value })
              }
              type="text"
              placeholder="Логин"
            />
            <input
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({ ...inputValue, password: e.target.value })
              }
              type="password"
              placeholder="Пароль"
            />
            <Link>Восстановить пароль</Link>

            <button
              type="submit"
              disabled={
                inputValue.password === "" || inputValue.login === ""
                  ? true
                  : false
              }
            >
              Подтвердить
            </button>
          </div>
        </form>
      </AuthContainer>
    </>
  );
}

export default Login;
