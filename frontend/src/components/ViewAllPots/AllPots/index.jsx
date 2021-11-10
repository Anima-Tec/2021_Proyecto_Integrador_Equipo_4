import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import fetchController from '../../../Networking/fetch-controller';
import TYPE from '../../../Networking/requestTypes';
import Cards from '../Cards'
import NotFound from '../NotFound';
import classes from './AllPots.module.scss';

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

  const changePageHandler = (newValue) => {
    getAllPots(newValue.selected);
  };

  return pots.length ? (
    <>
      <div className={classes.container}>
        <div className={classes['container-cards']}>
          {pots.map((pot) => (
            <Cards {...pot} />
          ))}
        </div>

        <div className={classes['pagination-container']}>
          <ReactPaginate
            pageCount={pageCount}
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'...'}
            onPageChange={changePageHandler}
            containerClassName={classes['pagination-container']}
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
