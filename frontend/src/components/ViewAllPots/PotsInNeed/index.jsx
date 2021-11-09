import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import fetchController from '../../../Networking/fetch-controller';
import TYPE from '../../../Networking/requestTypes';
import NotFound from '../NotFound';
import helpPotsImg from '../../../assets/images/imagesCards/HelpPotsImage.png';
import classes from './PotsInNeed.module.scss';

const ViewPotsInNeed = () => {
  const [pots, setPots] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const getPotsInNeed = async (page) => {
    const response = await fetchController(
      TYPE.VIEW_POTS_IN_NEED,
      {
        offset: page,
      },
      {}
    );
    setPots(response.data.Pots);
    setPageCount(response.data.PagesLeft + 1 + page);
  };

  useEffect(() => {
    getPotsInNeed(0);
  }, []);

  const changePageHandler = (newValue) => {
    getPotsInNeed(newValue.selected);
  };

  return pots.length ? (
    <>
      <div className={classes.container}>
        <div className={classes['container-cards']}>
          {pots.map((pot) => (
            <div className={classes.cards} key={pot.id} onClick={console.log()}>
              <div className={classes['container-img']}>
                <img className={classes.img} src={pot.imageURL} alt='img' />
                <img
                  className={classes['state-img']}
                  src={helpPotsImg}
                  alt='help'
                />
              </div>

              <h2 className={classes.name}>{pot.name}</h2>

              <button className={classes['state-0']}>Olla con necesidad</button>
            </div>
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
export default ViewPotsInNeed;
