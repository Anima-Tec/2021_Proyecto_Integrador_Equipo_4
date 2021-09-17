import React from 'react';
//import classes from './Crear-ollas.module.scss';
import {
  Add as AddIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons/';

const BuscarOllas = () => {

  return (
    <form className={classes['ollas-form']} onSubmit={(submitHandler)}>
      <LocationOnIcon />
      <input className={classes['input-ollas']} type="text" placeholder="Ingrese diección de la olla" id="adress" />
      <button className={classes['agregar-button']} type="submit"><AddIcon />Agregar</button>

    </form>
  )
}
export default BuscarOllas
