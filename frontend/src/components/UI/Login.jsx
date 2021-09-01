import classes from "./Login.module.scss";
import React from "react";
import Popup from "reactjs-popup";
import "../../../node_modules/reactjs-popup/dist/index.css";
const Login = () => (
  <Popup trigger={<button className={classes.LoginBtn}>Acceder</button>} modal>
    <div className={classes.modal}>
      <div className={classes.WelcomeContainer}>
        <p>Bienvenido</p>
      </div>
      <div className={classes.InfoContainer}>
        <input placeholder="Email"></input>
        <input placeholder="Contraseña"></input>
        <a
          href="https://www.google.com/?hl=es"
          target="_blank"
          rel="noreferrer"
          className={classes.ResetPssw}
        >
          Olvidé mi contraseña
        </a>
        <button>Entrar</button>
      </div>
    </div>
  </Popup>
);

export default Login;
