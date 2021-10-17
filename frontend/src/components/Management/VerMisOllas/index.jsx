import React, { useState, useEffect } from "react";
import { ArrowForwardIos as ArrowForwardIosIcon } from "@material-ui/icons/";

import classes from "./VerMisOllas.module.scss";
import imgPrueba from "../../../assets/images/img-prueba.jpg";

import fetchController from "../../../Networking/fetch-controller";
import TYPE from "../../../Networking/requestTypes";

const VerMisOllas = () => {
  const [pots, setPots] = useState([]);

  useEffect(() => {
    const getPots = async () => {
      try {
        const response = await fetchController(TYPE.VIEW_ALL_POTS);
        setPots(response.data.Pots);
      } catch (error) {
        return alert("Error desconocido.");
      }
    };
    getPots();
  }, []);

  return( 
    pots.map((pot) => 
    <div className={classes.container}>
          <div className={classes["container-content"]}>
            <h1 className={classes.title}>{pot.name}</h1>
            <button className={classes.state}>{pot.isInNeed}</button>
            <p className={classes.description}>{pot.desc}</p>
            <p className={classes.time}>Horario: {pot.openFrom} - {pot.to}</p>
            <button className={classes["edit-button"]}>
              Editar olla popular <ArrowForwardIosIcon />
            </button>
          </div>

          <div className={classes["container-img"]}>
            <img className={classes.img} src={imgPrueba} alt="img-prueba" />
          </div>
        </div>
      
    ));
};
export default VerMisOllas;
