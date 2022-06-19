import React, { useContext } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext"

function Header() {
  const {user, dispatch} = useContext(AuthContext);

  const logout = (e) => {
    e.preventDefault();

    dispatch({type:"LOGOUT"});
  }
 
  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.elements}>
          <li className={styles.logo}>
            <Link to="/" className={styles.logoLink}>Тучка</Link>
          </li>
          <ul className={styles.links}>
						<li className={styles.link}>
							Об облаке
						</li>
						<li className={styles.link}>
							Контакты
						</li>
						<li className={styles.link}>
							<div>{user.username}</div>
              <ul className={styles.submenu}>
                <li style={{visibility:"hidden", height:"60px"}}>{user.username}</li>
                {user.isAdmin && <li>Админ</li>}
                <li onClick={logout}>Выход</li>
              </ul>
						</li>
					</ul>
        </ul>
      </div>
    </header>
  );
}

export default Header;
