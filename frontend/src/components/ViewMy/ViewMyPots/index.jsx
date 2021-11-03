import React, { useState, useEffect } from "react";
import { ArrowForwardIos as ArrowForwardIosIcon } from "@material-ui/icons/";
import ReactPaginate from "react-paginate";
import { useToasts } from "react-toast-notifications";

import Spinner from "../../UI/Spinner";
import classes from "./ViewMyPots.module.scss";
import NotFound from "./NotFound";
import fetchController from "../../../Networking/fetch-controller";
import TYPE from "../../../Networking/requestTypes";

const ViewMyPots = () => {
  const { addToast } = useToasts();
  const [pots, setPots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(0);

  const getPots = async () => {
    if (localStorage.getItem("userIdentifier")) {
      const token = localStorage.getItem("userIdentifier");
      const response = await fetchController(TYPE.VIEW_MY_POTS, {
        currentPage
      }, { token });
      setPots(response.data.Pots);
      setPageCount(response.data.Pots.length / 5);

    } else {
      addToast("Debe loguearse para ver sus ollas.", {
        appearance: "error",
        autoDismiss: "4000",
      });
    }
  };

  useEffect(() => {
    getPots();
  }, []);

  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    getPots();
    setLoading(true);
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
            <img className={classes.img} src={pot.imageURL} alt="img-prueba" />
          </div>
        </div>
      ))}

      {pageCount > 1 && (
      <div className={classes["pagination-container"]}>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={0}
          onPageChange={handlePageChange}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={classes["pages-container"]}
					previousLinkClassName={classes.page}
					breakClassName={classes.page}
					nextLinkClassName={classes.page}
					pageClassName={classes.page}
					disabledClassNae={classes.disabled}
					activeClassName={classes.active}
        />   
      </div>
      )}
    </>
  ) : (
    <NotFound />
  );
};
export default ViewMyPots;
