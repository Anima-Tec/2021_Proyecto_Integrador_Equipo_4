import React from 'react';
import classes from './Crear-ollas.module.scss';
import {
  Add as AddIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons/';

const CrearOllas = () => {

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (

      <form className={classes['ollas-form']} onSubmit={(submitHandler)}>

        <input className={classes['input-ollas']} type="text" placeholder="Ingrese diección de la olla" id="adress" />
        <input className={classes['input-ollas']} type="text" placeholder="Nombre" id="name" />
        <input className={classes['input-ollas']} type="text" placeholder="Descripción" id="description" />

        <div className={classes.horarios}>

          <div className={classes['horarios-inicio']}>
            <p>Horario de apertura:</p>
            <div className={classes['inputs-inicio']}>
              <input className={classes['input-horarios']} placeholder="Hora" type="text" />
              <p className={classes.separacion}> : </p>
              <input className={classes['input-horarios']} placeholder="Minutos" type="text" />
            </div>
          </div>

          <div className={classes['horarios-fin']}>
            <p>Horario de cierre:</p>
            <div className={classes['inputs-fin']}>
              <input className={classes['input-horarios']} placeholder="Hora" type="text" />
              <p className={classes.separacion}> : </p>
              <input className={classes['input-horarios']} placeholder="Minutos" type="text" />
            </div>
          </div>

          <button className={classes['agregar-button']} type="submit"><AddIcon />Agregar</button>
        </div>
      </form>
  )
}

export default CrearOllas
