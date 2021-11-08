import React, { useState, useEffect } from "react";

import fetchController from "../../../Networking/fetch-controller";
import TYPE from "../../../Networking/requestTypes";
import NotFound from "../NotFound";
import helpPotsImg from "../../../assets/images/imagesCards/HelpPotsImage.png";
import classes from "./PotsInNeed.module.scss";

const ViewAllPots = () => {
  const [pots, setPots] = useState([]);

  const getPotsInNeed = async () => {
    const response = await fetchController(
      TYPE.VIEW_POTS_IN_NEED,
      {
        offset: 0,
      },
      {}
    );
    setPots(response.data.Pots);
  };

  useEffect(() => {
    getPotsInNeed();
  }, []);

  return pots.length ? (
    <>
      <div className={classes.container}>
        <div className={classes["container-cards"]}>
          {pots.map((pot) => (
            <div className={classes.cards} key={pot.id}>
              <div className={classes["container-img"]}>
                <img className={classes.img} src={pot.imageURL} alt="img" />
                <img
                  className={classes["state-img"]}
                  src={helpPotsImg}
                  alt="help"
                />
              </div>

              <h2 className={classes.name}>{pot.name}</h2>

              <button className={classes["state-0"]}>Olla con necesidad</button>
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
