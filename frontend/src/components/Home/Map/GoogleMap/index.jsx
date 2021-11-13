import { useCallback, useEffect, useState } from 'react';
import { GoogleMap as Map, LoadScript, Marker } from '@react-google-maps/api';
import { useToasts } from 'react-toast-notifications';

import fetchController from '../../../../Networking/fetch-controller';
import TYPE from '../../../../Networking/requestTypes';

import classes from './GoogleMap.module.scss';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const GoogleMap = () => {
  const { addToast } = useToasts();

  const [pots, setPots] = useState([]);
  const [actualLocation, setActualLocation] = useState({
    lat: -34.863177,
    lng: -56.16913,
  });

  const getAllPots = useCallback(async () => {
    const response = await fetchController(TYPE.GET_ALL_POTS);
    if (response.status === 200) {
      setPots(response.data.Pots);
    }
  }, []);

  const getActualLocalizationSuccess = (pos) => {
    const coords = pos.coords;

    if (coords) {
      setActualLocation({ lat: coords.latitude, lng: coords.longitude });
    }
  };

  const getActualLocalizationError = useCallback(
    (err) => {
      if (err.code === 1) {
        return addToast('Permiso a ubicación denegado.', {
          appearance: 'warning',
          autoDismiss: '10000',
        });
      }

      addToast(`Error desconocido: '${err.message}'`);
    },
    [addToast]
  );

  useEffect(() => {
    getAllPots();
    navigator.geolocation.getCurrentPosition(
      getActualLocalizationSuccess,
      getActualLocalizationError
    );
  }, [getActualLocalizationError, getAllPots]);

  return (
    <div className={classes['map-container']}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <Map
          mapContainerStyle={containerStyle}
          center={actualLocation}
          zoom={15}
        >
          {pots.map((pot) => (
            <Marker
              id={pot.id}
              key={pot.id}
              position={{ lat: Number(pot.lat), lng: Number(pot.lng) }}
            />
          ))}
        </Map>
      </LoadScript>
    </div>
  );
};

export default GoogleMap;
