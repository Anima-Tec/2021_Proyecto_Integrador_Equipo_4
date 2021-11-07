import React from 'react';
import {
  Search as SearchIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons/';

import classes from './SearchPots.module.scss';

const SearchPots = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className={classes['pots-form']} onSubmit={submitHandler}>
      <div className={classes['input-and-icon']}>
        <LocationOnIcon />
        <input
          className={classes['input-pots']}
          type='text'
          placeholder='Ingrese diección de la olla'
          id='adress'
        />
      </div>
      <button className={classes['search-button']} type='submit'>
        <SearchIcon />
        Buscar
      </button>
    </form>
  );
};

export default SearchPots;
