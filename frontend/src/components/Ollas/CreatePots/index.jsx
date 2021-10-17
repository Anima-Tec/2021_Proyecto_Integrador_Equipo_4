import React, { useRef } from 'react';
import {
  Add as AddIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons/';

import classes from './CreatePots.module.scss';
import fetchController from '../../../Networking/fetch-controller';
import TYPE from '../../../Networking/requestTypes';

const CreatePots = () => {
  const directionInputRef = useRef();
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const fromTimeFirstInputRef = useRef();
  const fromTimeSecondInputRef = useRef();
  const toTimeFirstInputRef = useRef();
  const toTimeSecondInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (localStorage.getItem('userIdentifier')) {
      const direction = directionInputRef.current.value;
      const name = nameInputRef.current.value;
      const email = localStorage.getItem('email');
      const description = descriptionInputRef.current.value;
      const fromTime = `${fromTimeFirstInputRef.current.value}:${fromTimeSecondInputRef.current.value}:00`;
      const toTime = `${toTimeFirstInputRef.current.value}:${toTimeSecondInputRef.current.value}:00`;
      let response;

      try {
        response = await fetchController(TYPE.ADD_POT, {
          email,
          name,
          description,
          latitude: 1,
          longitude: 1,
          from: fromTime,
          to: toTime,
        });
      } catch (error) {
        return error;
      }

      if (response.status === 200) {
        alert('Olla Popular guardada correctamente.');
        directionInputRef.current.value = '';
        nameInputRef.current.value = '';
        descriptionInputRef.current.value = '';
        fromTimeFirstInputRef.current.value = '';
        fromTimeSecondInputRef.current.value = '';
        toTimeFirstInputRef.current.value = '';
        toTimeSecondInputRef.current.value = '';
      }
    } else {
      alert('Inicie sesión para continuar.');
    }
  };

  return (
    <form className={classes['pots-form']} onSubmit={submitHandler}>
      <div className={classes['input-and-icon']}>
        <LocationOnIcon />
        <input
          className={classes['input-pots-icon']}
          type='text'
          placeholder='Ingrese diección de la olla'
          id='adress'
          ref={directionInputRef}
        />
      </div>
      <input
        className={classes['input-pots']}
        type='text'
        placeholder='Nombre'
        ref={nameInputRef}
        id='name'
      />
      <input
        className={classes['input-pots']}
        type='text'
        placeholder='Descripción'
        ref={descriptionInputRef}
        id='description'
      />
      <div className={classes['schedule-and-button']}>
        <div className={classes.schedule}>
          <div className={classes['start-schedule']}>
            <p>Horario de apertura:</p>
            <div className={classes['start-inputs']}>
              <input
                className={classes['input-schedule']}
                placeholder='Hora'
                min='0'
                max='24'
                maxLength='2'
                type='number'
                ref={fromTimeFirstInputRef}
              />
              <span className={classes.separation}> : </span>
              <input
                className={classes['input-schedule']}
                placeholder='Minutos'
                min='0'
                max='60'
                maxLength='2'
                type='number'
                ref={fromTimeSecondInputRef}
              />
            </div>
          </div>

          <div className={classes['end-schedule']}>
            <p>Horario de cierre:</p>
            <div className={classes['end-inputs']}>
              <input
                className={classes['input-schedule']}
                placeholder='Hora'
                min='0'
                max='24'
                maxLength='2'
                ref={toTimeFirstInputRef}
                type='number'
              />
              <span className={classes.separation}> : </span>
              <input
                className={classes['input-schedule']}
                placeholder='Minutos'
                min='0'
                max='60'
                maxLength='2'
                ref={toTimeSecondInputRef}
                type='number'
              />
            </div>
          </div>
        </div>
        <button className={classes['add-button']} type='submit'>
          <AddIcon />
          Agregar
        </button>
      </div>
    </form>
  );
};

export default CreatePots;
