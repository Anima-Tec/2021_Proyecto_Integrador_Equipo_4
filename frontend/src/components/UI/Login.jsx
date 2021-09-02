import classes from "./Login.module.scss";
import React from "react";
import Popup from "reactjs-popup";
import "../../../node_modules/reactjs-popup/dist/index.css";

const LoginHandler = (event) => {
  event.preventDefault();
}

const Login = () => (
  <Popup
    trigger={<button className={classes["login-btn"]}>Acceder</button>}
    modal
  >
    <div className={['login-container']}>
      <div className={classes["welcome-container"]}>
        <h4>Bienvenido</h4>
      </div>
      <form onSumbit={(LoginHandler)} className={classes["info-container"]}>
        <input type='email' placeholder="Email"></input>
        <input type='password' placeholder="Contraseña"></input>
        <a
          href="https://www.google.com/?hl=es"
          target="_blank"
          rel="noreferrer"
          className={classes["reset-passw"]}
        >
          Olvidé mi contraseña
        </a>
        <button type='sumbit'>Entrar</button>
      </form>
    </div>
  </Popup>
);

export default Login;
