import React from 'react';
import classes from './Buscar-ollas.module.scss';
import {
  Search as SearchIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons/';

const BuscarOllas = () => {

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className={classes['ollas-form']} onSubmit={(submitHandler)}>
      <input className={classes['input-ollas']} type="text" placeholder="Ingrese diección de la olla" id="adress" />
      <button className={classes['buscar-button']} type="submit"><SearchIcon/>Buscar</button>
    </form>
  )
}
export default BuscarOllas
