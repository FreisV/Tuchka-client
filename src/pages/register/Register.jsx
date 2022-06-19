import React, { useContext, useRef } from 'react'
import styles from './register.module.css'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import { loginCall, registerCall } from "../../apiCalls";
import { CircularProgress } from "@material-ui/core";


function Register() {
	const username = useRef();
	const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // await axios.post(
      //   "https://localhost:44328/api/Authenticate/register",
      //   {
      //     username: username.current.value,
			// 		email: email.current.value,
      //     password: password.current.value,
      //   }
      // );

      registerCall({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }, dispatch);
    } catch (err) {
      console.log(err);
    }
  };

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
            type="email"
            name="email"
            className={styles.input}
            placeholder="Email"
            ref={email}
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
            <Link className={styles.link} to="/login">Войти в аккаунт</Link>
            {isFetching ? (
            <div className={styles.progress}>
              <CircularProgress color="" size="26px" />
            </div>
          ) : (
            <button className={styles.button}>Регистрация</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register