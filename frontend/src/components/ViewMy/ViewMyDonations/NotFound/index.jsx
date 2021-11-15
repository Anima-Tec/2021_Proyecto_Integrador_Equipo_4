import React, { useState } from 'react';
import { Add as AddIcon } from '@material-ui/icons/';
import { useHistory } from 'react-router-dom';

import notFoundImg from '../../../../assets/images/NotFoundImg.png';
import classes from './NotFound.module.scss';
import Spinner from '../../../UI/Spinner';

const NotFound = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);

    const addDonations = () => {
      history.push('/')
        setLoading(true);
      };

  return (
    <>
      {loading && <Spinner />}
      <div className={classes['container']}>
        <div className={classes['container-img']}>
          <img src={notFoundImg} alt="notFoundImg" />
        </div>

        <div className={classes['container-text']}>
          <div className={classes['container-first-text']}>
            <h1 className={classes.title}>Si quieres ser un donador de</h1>
            <h1 className={classes['mayus-text']}>OLLA POPULAR </h1>
            <h1 className={classes.title2}> puedes hacerlo</h1>
          </div>

          <button className={classes['create-pot-button']} onClick={addDonations}>
            <AddIcon />
            Donar
          </button>
          <p className={classes.text}>
            Las donaciones a olla populares son realizadas con el fin de
            ayudarlas a seguir sustentandose y seguir brindandoles un plato de
            comida a todas esas familias del país.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
