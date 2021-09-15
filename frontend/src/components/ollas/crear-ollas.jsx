import React from 'react';
import classes from './crear-ollas.module.scss';
import {
  Add as AddIcon,
  // LocationOn as LocationOnIcon,
  Search as SearchIcon,
} from '@material-ui/icons/';

const CrearOllas = () => {

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>¿Vos colaborás?</h1>
      <p className={classes.description}>Ayuda a las familias uruguayas de todo el país colaborando con las ollas asociadas</p>

      <div className={classes['ollas-container']}>

        <div className={classes['header-ollas']}>
          <button className={classes['buscar-olla']}><SearchIcon /> Buscar olla</button>
          <button className={classes['agregar-olla']}><AddIcon /> Agregar olla</button>
        </div>

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
      </div>
    </div>
  )
}

export default CrearOllas