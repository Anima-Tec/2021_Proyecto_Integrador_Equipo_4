import React, { useState } from 'react';
import {
  Add as AddIcon,
  LocationOn as LocationOnIcon,
  ArrowUpward as ArrowUpwardIcon,
} from '@material-ui/icons/';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { useToasts } from 'react-toast-notifications';
import { FileUploader } from 'react-drag-drop-files';

import Spinner from '../../UI/Spinner';
import fetchController from '../../../Networking/fetch-controller';
import TYPE from '../../../Networking/requestTypes';
import classes from './CreatePots.module.scss';

const CreatePots = () => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    potName: '',
    description: '',
    fromTimeFirst: '',
    fromTimeSecond: '',
    toTimeFirst: '',
    toTimeSecond: '',
  });
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState(null);

  const updateFormData = (event) => {
    const inputId = event.target.id;
    let inputValue;
    if (
      inputId === 'fromTimeFirst' ||
      inputId === 'fromTimeSecond' ||
      inputId === 'toTimeFirst' ||
      inputId === 'toTimeSecond'
    ) {
      inputValue = event.target.value.replace(/[^\d]/g, '');
    } else {
      inputValue = event.target.value;
    }
    event.target.value = inputValue;
    setFormData((prevState) => ({ ...prevState, [inputId]: inputValue }));
  };

  const handleChange = (file) => {
    setFile(file);
  };

  const getCords = async (address) => {
    const results = await geocodeByAddress(address.label);
    const latlng = await getLatLng(results[0]);
    return latlng;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const {
      potName,
      description,
      fromTimeFirst,
      fromTimeSecond,
      toTimeFirst,
      toTimeSecond,
    } = formData;

    if (localStorage.getItem('userIdentifier')) {
      setLoading(true);
      const token = localStorage.getItem('userIdentifier');
      const fromTime = `${fromTimeFirst}:${fromTimeSecond}`;
      const toTime = `${toTimeFirst}:${toTimeSecond}`;
      const cords = await getCords(address);
      const addresss = address.label;

      const response = await fetchController(
        TYPE.ADD_POT,
        {
          address: addresss,
          potName,
          desc: description,
          latlng: cords,
          image: file,
          from: fromTime,
          to: toTime,
        },
        { token }
      );

      if (response.status === 200) {
        setLoading(false);
        addToast('Olla Popular guardada correctamente.', {
          appearance: 'success',
          autoDismiss: '10000',
        });
        setFormData({
          potName: '',
          description: '',
          fromTimeFirst: '',
          fromTimeSecond: '',
          toTimeFirst: '',
          toTimeSecond: '',
        });
        setFile(null);
        setAddress(null);
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
      {loading && <Spinner />}
      <div className={classes['input-and-icon']}>
        <LocationOnIcon />
        <GooglePlacesAutocomplete
          autocompletionRequest={{
            componentRestrictions: {
              country: ['uy'],
            },
          }}
          selectProps={{
            className: classes['input-pots-icon'],
            placeholder: 'Ingrese diección de la olla',
            type: 'text',
            id: 'address',
            onChange: setAddress,
          }}
          apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        />
      </div>
      <input
        className={classes['input-pots']}
        type='text'
        placeholder='Nombre'
        onChange={updateFormData}
        value={formData.potName}
        id='potName'
        required
      />
      <input
        className={classes['input-pots']}
        type='text'
        placeholder='Descripción'
        onChange={updateFormData}
        id='description'
        value={formData.description}
        maxLength='255'
        required
      />
      <div className={classes['uploader-container']}>
        <FileUploader
          classes={classes['drag-area']}
          handleChange={handleChange}
          children={
            <div>
              <div className={classes['upload-icon']}>
                <ArrowUpwardIcon />
              </div>
              {file != null ? (
                <p className={classes['upload-text']}>{file.name}</p>
              ) : (
                <p className={classes['upload-text']}>
                  <b>Seleccioná</b> una imagen para tu olla
                </p>
              )}
            </div>
          }
          name='file'
          hoverTitle='Suelta tu archivo aqui'
        />
      </div>
      <div className={classes['schedule-and-button']}>
        <div className={classes.schedule}>
          <div className={classes['start-schedule']}>
            <p>Horario de apertura:</p>
            <div className={classes['start-inputs']}>
              <input
                className={classes['input-schedule']}
                placeholder='Hora'
                maxLength='2'
                type='text'
                id='fromTimeFirst'
                value={formData.fromTimeFirst}
                onChange={updateFormData}
              />
              <span className={classes.separation}> : </span>
              <input
                className={classes['input-schedule']}
                placeholder='Minutos'
                maxLength='2'
                type='text'
                id='fromTimeSecond'
                value={formData.fromTimeSecond}
                onChange={updateFormData}
                required
              />
            </div>
          </div>

          <div className={classes['end-schedule']}>
            <p>Horario de cierre:</p>
            <div className={classes['end-inputs']}>
              <input
                className={classes['input-schedule']}
                placeholder='Hora'
                maxLength='2'
                type='text'
                id='toTimeFirst'
                value={formData.toTimeFirst}
                onChange={updateFormData}
                required
              />
              <span className={classes.separation}> : </span>
              <input
                className={classes['input-schedule']}
                placeholder='Minutos'
                maxLength='2'
                type='text'
                id='toTimeSecond'
                value={formData.toTimeSecond}
                onChange={updateFormData}
                required
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
