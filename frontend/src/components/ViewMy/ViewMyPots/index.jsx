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
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  const getPots = async () => {
    if (localStorage.getItem("userIdentifier")) {
      const token = localStorage.getItem("userIdentifier");
      debugger;
      const response = await fetchController(
        TYPE.VIEW_MY_POTS,
        {
          offset: currentPage,
        },
        { token }
      );
      if (response.data.Pots) {
        setPots(response.data.Pots);
        setPageCount(response.data.PagesLeft +1+ currentPage);
        console.log(currentPage, 'pagina que se le pasa al offset')
      }
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

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
    console.log(event.selected);
    getPots();
  };

  return pots.length ? (
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
      <div className={classes["pagination-container"]}>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          id="number"
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
    </>
  ) : (
    <NotFound />
  );
};
export default ViewMyPots;
