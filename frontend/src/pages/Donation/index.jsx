import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Donation.module.scss';
import logo from '../../assets/images/color-palette.png';
import fetchController from '../../Networking/fetch-controller';
import TYPE from '../../Networking/requestTypes';

const Donation = () => {
  const { potID } = useParams();
  const [potInfo, setPotInfo] = useState();

  const getPotInfo = useCallback(async () => {
    const response = await fetchController(TYPE.VIEW_A_POT, { id: potID });
    setPotInfo(response.data.Pot[0]);
  }, [potID]);
  console.log(potInfo);
  useEffect(() => getPotInfo(), [getPotInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className={classes.container}>
      <form onSubmit={submitHandler} className={classes.information}>
        <h1 className={classes.title}>
          ¿Quiénes somos y a
          <span className={classes['title-highlight']}> QUIÉNES</span> ayudamos?
        </h1>
        <p>{potInfo.desc}</p>
        <div className={classes['time-direction']}>
          <span>
            horario: {potInfo.openFrom} : {potInfo.to}
          </span>
          <span>{potInfo.address}</span>
        </div>
        <div className={classes.options}>
          <label className={classes.option} htmlFor='food'>
            <span>Alimentos</span>
            <input
              className={classes.checkbox}
              type='radio'
              name='typeOfDonation'
              id='food'
            />
          </label>
          <label className={classes.option} htmlFor='money'>
            <span>Dinero</span>
            <input
              className={classes.checkbox}
              type='radio'
              name='typeOfDonation'
              id='money'
            />
          </label>
        </div>
        <button type='submit'>Donar</button>
      </form>
      <div className={classes['image-container']}>
        <img className={classes.image} src={potInfo.imageURL} alt='pot' />
      </div>
    </section>
  );
};

export default Donation;
