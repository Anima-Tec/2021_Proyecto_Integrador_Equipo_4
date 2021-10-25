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
    adress: '',
    potName: '',
    description: '',
    fromTimeFirst: '',
    fromTimeSecond: '',
    toTimeFirst: '',
    toTimeSecond: '',
  });
  const [loading, setLoading] = useState(false);

  //mantuve estos por que estan utilizados para combinar lo ingresado mas abajo
  const fromTimeFirstInputRef = useRef();
  const fromTimeSecondInputRef = useRef();
  const toTimeFirstInputRef = useRef();
  const toTimeSecondInputRef = useRef();

  const updateFormData = (event) => {
    const value = event.target.value;
    const inputId = event.target.id;
    setFormData((prevState) => ({ ...prevState, [inputId]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { adress, potName, description, fromTime, toTime } = formData;

  if (localStorage.getItem('userIdentifier')) {
    setLoading(true);
    {loading ? <Spinner /> : <div />}
    const email = localStorage.getItem('email');
    const fromTime = `${fromTimeFirstInputRef.current.value}:${fromTimeSecondInputRef.current.value}:00`;
    const toTime = `${toTimeFirstInputRef.current.value}:${toTimeSecondInputRef.current.value}:00`;

    const response = await fetchController(TYPE.ADD_POT, {
      email,
      adress,
      potName,
      description,
      latitude: 1,
      longitude: 1,
      from: fromTime,
      to: toTime,
    });

    if (response.status === 200) {
      setLoading(false);
      {loading ? <Spinner /> : <div />}
      addToast('Olla Popular guardada correctamente.', {
        appearance: 'success',
        autoDismiss: '10000',
      });
      //debería sacar esto?, a 3 primeros solo les cambie el nombre 
      adress.current.value = '';
      potName.current.value = '';
      description.current.value = '';
      fromTimeFirstInputRef.current.value = '';
      fromTimeSecondInputRef.current.value = '';
      toTimeFirstInputRef.current.value = '';
      toTimeSecondInputRef.current.value = '';
    }
  } else {
    setLoading(false);
    {loading ? <Spinner /> : <div />}
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
          id='adress'
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
                maxLength='2'
                type='number'
                //tengo dudas de si utilizar onChange={updateFormData} en estos campos ya que no tienen id

                //entiendo que este ref se tiene que mantener para juntar los valores de los 2 inputs como se hace mas arriba
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
