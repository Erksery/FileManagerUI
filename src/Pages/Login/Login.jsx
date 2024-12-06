import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Login.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const [inputValue, setInputValue] = useState({ login: "", password: "" });
  const navigate = useNavigate();
  const { login } = useLogin();

  return (
    <>
      <AuthContainer>
        <form
          onSubmit={(e) => login(inputValue, e)}
          className={styles.logContainer}
        >
          <h1>Авторизация</h1>
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
