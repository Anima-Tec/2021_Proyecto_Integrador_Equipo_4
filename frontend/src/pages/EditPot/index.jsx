import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLoadScript } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'; // getLatLng, // geocodeByAddress,
import {
  LocationOn as LocationOnIcon,
  Add as AddIcon,
  ArrowUpward as ArrowUpwardIcon,
} from '@material-ui/icons/';
import { FileUploader } from 'react-drag-drop-files';

import fetchController from '../../Networking/fetch-controller';
import TYPE from '../../Networking/requestTypes';
import { fileTypes, googleApiLibraries } from '../../utils/enums';

import classes from './EditPot.module.scss';

const EditPot = () => {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: googleApiLibraries,
  });
  const { potID } = useParams();

  const [pot, setPot] = useState({
    id: '',
    potName: '',
    description: '',
    address: '',
    openFrom: '',
    to: '',
    isInNeed: '',
  });

  const [file, setFile] = useState();

  const [formData, setFormData] = useState({
    id: '',
    potName: '',
    description: '',
    fromTimeFirst: '',
    fromTimeSecond: '',
    toTimeFirst: '',
    toTimeSecond: '',
  });
  const [address, setAddress] = useState();

  const getPotInfo = useCallback(async (potId) => {
    const response = await fetchController(TYPE.VIEW_A_POT, { id: potId });

    if (response.status === 200) {
      const { id, name, desc, address, openFrom, to, isInNeed } =
        response.data.Pot[0];

      setPot({
        id,
        potName: name,
        description: desc,
        address,
        openFrom,
        to,
        isInNeed,
      });
      setAddress(address);
    }
    console.log(response);
  }, []);

  useEffect(() => {
    getPotInfo(potID);
  }, [getPotInfo, potID]);

  useEffect(() => {
    const openFromTime = pot.openFrom.substring(0, pot.openFrom.length - 3);
    const toTime = pot.to.substring(0, pot.to.length - 3);
    const fromTime = openFromTime.split(':');
    const to = toTime.split(':');

    setFormData({
      id: pot.id,
      potName: pot.potName,
      description: pot.description,
      fromTimeFirst: fromTime[0],
      fromTimeSecond: fromTime[1],
      toTimeFirst: to[0],
      toTimeSecond: to[1],
    });

    setAddress(pot.address);
  }, [address, pot]);

  const updateFile = (file) => {
    setFile(file);
  };

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

  // const getCoords = async (address) => {
  //   const results = await geocodeByAddress(address.label);
  //   const latlng = await getLatLng(results[0]);
  //   return latlng;
  // };

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <section className={classes.container}>
      <div className={classes['content-container']}>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes['input-and-icon']}>
            <LocationOnIcon />
            {isLoaded && (
              <GooglePlacesAutocomplete
                autocompletionRequest={{
                  componentRestrictions: {
                    country: ['uy'],
                  },
                }}
                selectProps={{
                  className: classes['input-pots-icon'],
                  placeholder: address,
                  type: 'text',
                  id: 'address',
                  onChange: setAddress,
                }}
              />
            )}
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
              handleChange={updateFile}
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
              types={fileTypes}
              name='file'
              hoverTitle='Suelta tu archivo aqui'
            />
          </div>
          <div className={classes['schedule-and-button']}>
            <div className={classes.schedule}>
              <div className={classes['start-schedule']}>
                <p>Horario de apertura:&nbsp;</p>
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
                <p>Horario de cierre:&nbsp;</p>
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
      </div>
    </section>
  );
};
export default EditPot;
