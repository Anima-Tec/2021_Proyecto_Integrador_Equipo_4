import React, { useState, useEffect } from "react";

import fetchController from "../../../Networking/fetch-controller";
import TYPE from "../../../Networking/requestTypes";
import NotFound from "../NotFound";
import helpPotsImg from "../../../assets/images/imagesCards/HelpPotsImage.png";
import noNeedPotsImg from "../../../assets/images/imagesCards/NoNeedPotsImage.png";
import classes from "./AllPots.module.scss";

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
      <div className={classes.container}>
        
        <div className={classes["container-cards"]}>
          {pots.map((pot) => (
            <div className={classes.cards}>
              <div className={classes["container-img"]}>
                <img className={classes.img} src={pot.imageURL} alt="img" />
                {pot.isInNeed === 1 && (
                  <img
                    className={classes["state-img"]}
                    src={noNeedPotsImg}
                    alt=""
                  />
                )}
                {pot.isInNeed === 0 && (
                  <img
                    className={classes["state-img"]}
                    src={helpPotsImg}
                    alt=""
                  />
                )}
              </div>

              <h2 className={classes.name}>{pot.name}</h2>

              {pot.isInNeed === 1 && (
                <button className={classes["state-1"]}>
                  Olla sin necesidad
                </button>
              )}
              {pot.isInNeed === 0 && (
                <button className={classes["state-0"]}>
                  Olla con necesidad
                </button>
              )}
            </div>
          ))}
        </div>

        <div className={classes["pagination-container"]}></div>
      </div>
    </>
  ) : (
    <NotFound />
  );
};
export default ViewAllPots;
