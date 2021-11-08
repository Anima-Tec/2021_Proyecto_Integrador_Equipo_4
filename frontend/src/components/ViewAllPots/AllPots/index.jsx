import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import fetchController from "../../../Networking/fetch-controller";
import TYPE from "../../../Networking/requestTypes";
import NotFound from "../NotFound";
import helpPotsImg from "../../../assets/images/imagesCards/HelpPotsImage.png";
import noNeedPotsImg from "../../../assets/images/imagesCards/NoNeedPotsImage.png";
import classes from "./AllPots.module.scss";

const ViewAllPots = () => {
  const [pots, setPots] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const getAllPots = async (page) => {
    const response = await fetchController(
      TYPE.VIEW_ALL_POTS,
      {
        offset: page,
      },
      {}
    );
      setPots(response.data.Pots);
      setPageCount(response.data.PagesLeft + 1 + page);
  };

  useEffect(() => {
    getAllPots(0);
  }, []);

  const handlePageClick = (newValue) => {
    getAllPots(newValue.selected);
  };

  return pots.length ? (
    <>
      <div className={classes.container}>
        <div className={classes["container-cards"]}>
          {pots.map((pot) => (
            <div className={classes.cards} key={pot.id}>
              <div className={classes["container-img"]}>
                <img className={classes.img} src={pot.imageURL} alt="img" />
                {pot.isInNeed === 0 && (
                  <img
                    className={classes["state-img"]}
                    src={noNeedPotsImg}
                    alt="noNeed"
                  />
                )}
                {pot.isInNeed === 1 && (
                  <img
                    className={classes["state-img"]}
                    src={helpPotsImg}
                    alt="help"
                  />
                )}
              </div>

              <h2 className={classes.name}>{pot.name}</h2>

              {pot.isInNeed === 0 && (
                <button className={classes["state-1"]}>
                  Olla sin necesidad
                </button>
              )}
              {pot.isInNeed === 1 && (
                <button className={classes["state-0"]}>
                  Olla con necesidad
                </button>
              )}
            </div>
          ))}
        </div>

        <div className={classes["pagination-container"]}>
          <ReactPaginate
            pageCount={pageCount}
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            onPageChange={handlePageClick}
            containerClassName={classes["pagination-container"]}
            pageClassName={classes.page}
            breakClassName={classes.page}
            previousClassName={classes.page}
            nextClassName={classes.page}
            disabledClassName={classes.disabled}
            activeClassName={classes.active}
          />
        </div>
      </div>
    </>
  ) : (
    <NotFound />
  );
};
export default ViewAllPots;
