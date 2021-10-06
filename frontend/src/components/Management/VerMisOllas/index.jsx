import React from "react";
import { ArrowForwardIos as ArrowForwardIosIcon } from "@material-ui/icons/";
import classes from "./VerMisOllas.module.scss";
import imgPrueba from "../../../assets/images/img-prueba.jpg";

const VerMisOllas = () => {
  return (
    <div className={classes.container}>
      <div className={classes["container-content"]}>
        <h1 className={classes.title}>Benito camelo</h1>
        <button className={classes.state}>Olla sin necesidad</button>
        <p className={classes.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius modi
          tenetur sequi voluptate expedita quas aperiam. Modi fuga minus totam!
          Ut quo ipsam unde atque nostrum explicabo sapiente maiores temporibus?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius modi
          tenetur sequi voluptate expedita quas aperiam. Modi fuga minus totam!
          Ut quo ipsam unde atque nostrum explicabo sapiente maiores temporibus?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius modi
          tenetur sequi voluptate expedita quas aperiam. Modi fuga minus totam!
          Ut quo ipsam unde atque nostrum explicabo sapiente maiores temporibus?
          
        </p>
        <p className={classes.time}>Horario: 10:00 - 01:00</p>
        <button className={classes["edit-button"]}>Editar olla popular <ArrowForwardIosIcon/> </button>
      </div>
      <div className={classes["container-img"]}>
        <img className={classes.img} src={imgPrueba} alt="img-prueba" />
      </div>
    </div>
  );
};
export default VerMisOllas;
