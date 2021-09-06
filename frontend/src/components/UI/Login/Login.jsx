import classes from "./Login.module.scss";
import React from "react";
import Popup from "reactjs-popup";
import "../../../../node_modules/reactjs-popup/dist/index.css";

const LoginHandler = (event) => {
  event.preventDefault();
}

const Login = () => (
  <Popup
    trigger={<button className={classes["login-btn"]}>Acceder</button>}
    modal
  >
    <div className={["login-container"]}>
      <div className={classes["welcome-container"]}>
        <h4>Bienvenido</h4>
      </div>
      <form onSumbit={LoginHandler} className={classes["info-container"]}>
        <input type="email" placeholder="Email" required></input>
        <input type="password" placeholder="Contraseña" minLength="8" required></input>
        <a
          href="https://www.google.com/?hl=es" //Lo dejé como Google porque no se exactamente que irá ahi
          target="_blank"
          rel="noreferrer"
          className={classes["reset-passw"]}
        >
          Olvidé mi contraseña
        </a>
        <button type="sumbit">Entrar</button>
      </form>
    </div>
  </Popup>
);

export default Login;
