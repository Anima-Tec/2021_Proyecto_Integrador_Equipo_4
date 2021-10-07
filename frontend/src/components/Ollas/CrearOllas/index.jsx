import React, { useRef } from "react";
import classes from "./CrearOllas.module.scss";
import {
  Add as AddIcon,
  LocationOn as LocationOnIcon,
} from "@material-ui/icons/";
import fetchController from "../../../Networking/fetch-controller";
import TYPE from "../../../Networking/requestTypes";

const CrearOllas = () => {
  const directionInputRef = useRef();
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const fromTimeFirstInputRef = useRef();
  const fromTimeSecondInputRef = useRef();
  const toTimeFirstInputRef = useRef();
  const toTimeSecondInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (localStorage.getItem("userIdentifier")) {
      const direction = directionInputRef.current.value;
      const name = nameInputRef.current.value;
      const email = localStorage.getItem("email");
      const description = descriptionInputRef.current.value;
      const fromTime = `${fromTimeFirstInputRef.current.value}:${fromTimeSecondInputRef.current.value}:00`;
      const toTime = `${toTimeFirstInputRef.current.value}:${toTimeSecondInputRef.current.value}:00`;
      let response;

      try {
        response = await fetchController(TYPE.ADD_POT, {
          email,
          name,
          description,
          latitude: 1,
          longitude: 1,
          from: fromTime,
          to: toTime,
        });
      } catch (error) {
        return error;
      }

      if (response.status === 200) {
        alert("Olla Popular guardada correctamente.");
        directionInputRef.current.value = "";
        nameInputRef.current.value = "";
        descriptionInputRef.current.value = "";
        fromTimeFirstInputRef.current.value = "";
        fromTimeSecondInputRef.current.value = "";
        toTimeFirstInputRef.current.value = "";
        toTimeSecondInputRef.current.value = "";
      }
    } else {
      alert("Inicie sesión para continuar.");
    }
  };

  return (
    <form className={classes["ollas-form"]} onSubmit={submitHandler}>
      <div className={classes["input-and-icon"]}>
        <LocationOnIcon />
        <input
          className={classes["input-ollas-icon"]}
          type="text"
          placeholder="Ingrese diección de la olla"
          id="adress"
          ref={directionInputRef}
        />
      </div>
      <input
        className={classes["input-ollas"]}
        type="text"
        placeholder="Nombre"
        ref={nameInputRef}
        id="name"
      />
      <input
        className={classes["input-ollas"]}
        type="text"
        placeholder="Descripción"
        ref={descriptionInputRef}
        id="description"
      />
      <div className={classes["horarios-and-button"]}>
        <div className={classes.horarios}>
          <div className={classes["horarios-inicio"]}>
            <p>Horario de apertura:</p>
            <div className={classes["inputs-inicio"]}>
              <input
                className={classes["input-horarios"]}
                placeholder="Hora"
                min="0"
                max="24"
                maxLength="2"
                type="number"
                ref={fromTimeFirstInputRef}
              />
              <span className={classes.separacion}> : </span>
              <input
                className={classes["input-horarios"]}
                placeholder="Minutos"
                min="0"
                max="60"
                maxLength="2"
                type="number"
                ref={fromTimeSecondInputRef}
              />
            </div>
          </div>

          <div className={classes["horarios-fin"]}>
            <p>Horario de cierre:</p>
            <div className={classes["inputs-fin"]}>
              <input
                className={classes["input-horarios"]}
                placeholder="Hora"
                min="0"
                max="24"
                maxLength="2"
                ref={toTimeFirstInputRef}
                type="number"
              />
              <span className={classes.separacion}> : </span>
              <input
                className={classes["input-horarios"]}
                placeholder="Minutos"
                min="0"
                max="60"
                maxLength="2"
                ref={toTimeSecondInputRef}
                type="number"
              />
            </div>
          </div>
        </div>
        <button className={classes["agregar-button"]} type="submit">
          <AddIcon />
          Agregar
        </button>
      </div>
    </form>
  );
};

export default CrearOllas;
