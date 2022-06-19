import React, { useContext, useRef } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import { CircularProgress } from "@material-ui/core";


function Login() {
  const username = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();

      loginCall(
        { username: username.current.value, password: password.current.value},
        dispatch
      );
    }

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <span className={styles.logo}>Тучка</span>
        <form className={styles.form} onSubmit={handleClick}>
          <input
            type="text"
            name="username"
            className={styles.input}
            placeholder="Имя пользователя"
            ref={username}
            required
          />
          <input
            type="password"
            name="password"
            className={styles.input}
            placeholder="Пароль"
            minLength="6"
            pattern="^(?=.*[A-ZА-Я])(?=.*[а-яa-z])(?=.*\d).*$"
            ref={password}
            required
          />
          <div className={styles.row}>
            <Link className={styles.link} to="/register">
              Создать новый аккаунт
            </Link>
            {isFetching ? (
            <div className={styles.progress}>
              <CircularProgress color="" size="26px" />
            </div>
          ) : (
            <button className={styles.button}>Вход</button>
          )}
            {/* <button className={styles.button}>Вход</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
