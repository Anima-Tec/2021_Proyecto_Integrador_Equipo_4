import React, { useState, useEffect, useCallback } from 'react';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@material-ui/icons';
import ReactPaginate from 'react-paginate';
import { useToasts } from 'react-toast-notifications';

import classes from './ViewMyPots.module.scss';
import NotFound from './NotFound';
import fetchController from '../../../Networking/fetch-controller';
import TYPE from '../../../Networking/requestTypes';

const ViewMyPots = () => {
  const { addToast } = useToasts();
  const [pots, setPots] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const getPots = useCallback(
    async (page) => {
      if (localStorage.getItem('userIdentifier')) {
        const token = localStorage.getItem('userIdentifier');
        const response = await fetchController(
          TYPE.VIEW_MY_POTS,
          {
            offset: page,
          },
          { token }
        );
        if (response.data.Pots) {
          setPots(response.data.Pots);
          setPageCount(response.data.PagesLeft + 1 + page);
        }
      } else {
        addToast('Debe loguearse para ver sus ollas.', {
          appearance: 'error',
          autoDismiss: '4000',
        });
      }
    },
    [addToast]
  );

  useEffect(() => {
    getPots(0);
  }, [getPots]);

  const handlePageClick = (newValue) => {
    getPots(newValue.selected);
  };

  return pots.length ? (
    <>
      {pots.map((pot) => (
        <div className={classes.container} key={pot.id}>
          <div className={classes['container-content']}>
            <h1 className={classes.title}>{pot.name}</h1>

            {pot.isInNeed === 0 && (
              <button className={classes['state-1']}>Olla sin necesidad</button>
            )}
            {pot.isInNeed === 1 && (
              <button className={classes['state-0']}>Olla con necesidad</button>
            )}

            <p className={classes.description}>{pot.desc}</p>
            <p className={classes.time}>
              Horario: {pot.openFrom} - {pot.to}
            </p>
            <button className={classes['edit-button']}>
              Editar olla popular <ArrowForwardIosIcon />
            </button>
          </div>

          <div className={classes['container-img']}>
            <img className={classes.img} src={pot.imageURL} alt='img-prueba' />
          </div>
        </div>
      ))}
      <div className={classes['pagination-container']}>
        <ReactPaginate
          pageCount={pageCount}
          previousLabel={'←'}
          nextLabel={'→'}
          breakLabel={'...'}
          onPageChange={handlePageClick}
          containerClassName={classes['pagination-container']}
          pageClassName={classes.page}
          breakClassName={classes.page}
          previousClassName={classes.page}
          nextClassName={classes.page}
          disabledClassName={classes.disabled}
          activeClassName={classes.active}
        />
      </div>
    </>
  ) : (
    <NotFound />
  );
};
export default ViewMyPots;
