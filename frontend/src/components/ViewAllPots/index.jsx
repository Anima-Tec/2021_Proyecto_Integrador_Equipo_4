import React, { useState, useEffect } from "react";

import classes from "./ViewAllPots.module.scss";
import fetchController from "../../Networking/fetch-controller";
import TYPE from "../../Networking/requestTypes";

const ViewAllPots = () => {
  const [pots, setPots] = useState([]);

  const getAllPots = async () => {
      const response = await fetchController(
        TYPE.VIEW_ALL_POTS,
        {
          offset: 0,
        },
        {}
      );
      setPots(response.data.Pots);
  };

  useEffect(() => {
    getAllPots();
  }, []);

  return pots.length ? (
    <>
      {pots.map((pot) => (
        <div className={classes.container}>
 
          <div className={classes["container-img"]}>
            <img className={classes.img} src={pot.imageURL} alt="img-prueba"/>
          </div>
          
          <div className={classes["container-content"]}>
            <h1 className={classes.title}>{pot.name}</h1>

            {pot.isInNeed === 1 && (
              <button className={classes["state-1"]}>Olla sin necesidad</button>
            )}
            {pot.isInNeed === 0 && (
              <button className={classes["state-0"]}>Olla con necesidad</button>
            )}
          </div>

         
        </div>
      ))}
      <div className={classes["pagination-container"]}>
      </div>
    </>
  ) : (
      <p>hola</p>
    // <NotFound />
  );
};
export default ViewAllPots;


