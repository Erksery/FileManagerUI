import axios from "axios";
import React, { useState } from "react";
import styles from "./Registration.module.scss";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const [inputValue, setInputValue] = useState({ login: "", password: "" });
  const navigate = useNavigate();

  const regSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/registration", inputValue);
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.log("Ошибка при регистрации", err);
    }
  };

  return (
    <>
      <AuthContainer>
        <form onSubmit={regSubmit} className={styles.regContainer}>
          <p className={styles.pageName}>Регистрация</p>
          <h1>Добро пожаловать!</h1>
          <p>
            Уже есть аккаунт? <Link to={"/login"}>Авторизуйся</Link>
          </p>
          <div className={styles.inputContainer}>
            <input
              value={inputValue.login}
              onChange={(e) =>
                setInputValue({ ...inputValue, login: e.target.value })
              }
              placeholder="Логин"
            />
            <input
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({ ...inputValue, password: e.target.value })
              }
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

export default Registration;
