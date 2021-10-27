import React, { useRef, useState } from 'react';
import {
  Add as AddIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons/';
import { useToasts } from 'react-toast-notifications';

import Spinner from '../../UI/Spinner'
import classes from './CreatePots.module.scss';
import fetchController from '../../../Networking/fetch-controller';
import TYPE from '../../../Networking/requestTypes';

const CreatePots = () => {
  const { addToast } = useToasts();
  const [formData, setFormData] = useState({
    address: '',
    potName: '',
    description: '',
    fromTimeFirst: '',
    fromTimeSecond: '',
    toTimeFirst: '',
    toTimeSecond: '',
  });
  const [loading, setLoading] = useState(false);

  const updateFormData = (event) => {
    const value = event.target.value;
    const inputId = event.target.id;
    setFormData((prevState) => ({ ...prevState, [inputId]: value }));
    //event.current.length
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { address, potName, description, fromTimeFirst, fromTimeSecond, toTimeFirst, toTimeSecond } = formData;

  if (localStorage.getItem('userIdentifier')) {
    setLoading(true);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('userIdentifier')
    const fromTime = `${fromTimeFirst}:${fromTimeSecond}`;
    const toTime = `${toTimeFirst}:${toTimeSecond}`;
    
    const response = await fetchController(TYPE.ADD_POT, {
      email,
      address,
      potName,
      description,
      latitude: 1,
      longitude: 1,
      from: fromTime,
      to: toTime,
    },
    {token}
    );

    if (response.status === 200) {
      setLoading(false);
      addToast('Olla Popular guardada correctamente.', {
        appearance: 'success',
        autoDismiss: '10000',
      });
    }
  } else {
    setLoading(false);
    return addToast('Inicie sesión para continuar', {
      appearance: 'error',
      autoDismiss: '4000',
    });
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
          id='address'
          onChange={updateFormData}
        />
      </div>
      <input
        className={classes['input-pots']}
        type='text'
        placeholder='Nombre'
        onChange={updateFormData}
        id='potName'
      />
      <input
        className={classes['input-pots']}
        type='text'
        placeholder='Descripción'
        onChange={updateFormData}
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
                type='number'
                id='fromTimeFirst'
                onChange={updateFormData}
              />
              <span className={classes.separation}> : </span>
              <input
                className={classes['input-schedule']}
                placeholder='Minutos'
                min='0'
                max='60'
                type='number'
                id='fromTimeSecond'
                onChange={updateFormData}
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
                type='number'
                id='toTimeFirst'
                onChange={updateFormData}
              />
              <span className={classes.separation}> : </span>
              <input
                className={classes['input-schedule']}
                placeholder='Minutos'
                min='0'
                max='60'
                type='number'
                id='toTimeSecond'
                onChange={updateFormData}
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
