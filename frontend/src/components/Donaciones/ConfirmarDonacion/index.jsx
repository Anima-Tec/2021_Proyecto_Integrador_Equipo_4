import classes from "./ConfirmarDonacion.module.scss";
import Popup from "reactjs-popup";
import donation from "../../../assets/images/donation.png";

const ConfirmarDonacion = ({ children }) => {
  return (
    <Popup trigger={children} modal className={classes["d-popup-content"]}>
      {(close) => (
        <div className={classes["d-confirm-container"]}>
          <button className={classes.close} onClick={close}>
            &times;
          </button>
          <div className={classes["d-info-container"]}>
            <div className={classes["d-info-part-one"]}>
              <div className={classes["d-info-tittle"]}>
                <h1>Tu contacto de</h1>
                <h1 className={classes["part-text-donation"]}> DONACION </h1>
                <h1>ha sido enviado</h1>
              </div>
              <div className={classes["d-info-text"]}>
                <p>
                  Tus datos de contacto de donador han sido enviados al dueño de
                  la olla
                </p>
              </div>
              <div className={classes["d-info-owner"]}>
                <p>Dueño de olla:</p>
              </div>
            </div>
            <div className={classes["d-info-part-two"]}>
              <div className={classes["d-info-img"]}>
                <img src={donation} alt="Info-logo" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ConfirmarDonacion;
