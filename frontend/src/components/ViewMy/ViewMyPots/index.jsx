import React, { useState, useEffect } from "react";
import { ArrowForwardIos as ArrowForwardIosIcon } from "@material-ui/icons/";
import ReactPaginate from "react-paginate";

import classes from "./ViewMyPots.module.scss";
import NotFound from "./NotFound";
import imgPrueba from "../../../assets/images/img-prueba.jpg";
import fetchController from "../../../Networking/fetch-controller";
import TYPE from "../../../Networking/requestTypes";

const ViewMyPots = () => {
  const [pots, setPots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(0);

  const getPots = async () => {
    const token = localStorage.getItem('userIdentifier')
    const response = await fetchController(TYPE.VIEW_MY_POTS,{}, {token});
    setPots(response.data.Pots);
    setPageCount(response.lenght / 5);
    setLoading(true);

    //response.status
  };
  useEffect(() => {
    getPots();
  }, []);

  const paginationUrl = `http://127.0.0.1:8000/api/pots/user&page=${currentPage}`;

  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
  };

  return pots.length >= 1 ? (
    <>
      {pots.map((pot) => (
        <div className={classes.container}>
          <div className={classes["container-content"]}>
            <h1 className={classes.title}>{pot.name}</h1>

            {pot.isInNeed === 1 && (
              <button className={classes["state-1"]}>Olla sin necesidad</button>
            )}
            {pot.isInNeed === 0 && (
              <button className={classes["state-0"]}>Olla con necesidad</button>
            )}

            <p className={classes.description}>{pot.desc}</p>
            <p className={classes.time}>
              Horario: {pot.openFrom} - {pot.to}
            </p>
            <button className={classes["edit-button"]}>
              Editar olla popular <ArrowForwardIosIcon />
            </button>
          </div>

          <div className={classes["container-img"]}>
            <img className={classes.img} src={imgPrueba} alt="img-prueba" />
          </div>
        </div>
      ))}
      <div className={classes["pagination-container"]}>
        <ReactPaginate
          pageCount={pageCount}
          pageRange={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"container"}
          previousLinkClassName={"page"}
          breakClassName={"page"}
          nextLinkClassName={"page"}
          pageClassName={"page"}
          disabledClassNae={"disabled"}
          activeClassName={"active"}
        />
      </div>
    </>
  ) : (
    <NotFound />
  );
};
export default ViewMyPots;
