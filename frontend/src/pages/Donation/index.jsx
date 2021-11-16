import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { KeyboardArrowRight as Arrow } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';

import fetchController from '../../Networking/fetch-controller';
import TYPE from '../../Networking/requestTypes';
import Spinner from '../../components/UI/Spinner';
import DonationConfirmation from '../../components/DonationConfirmation';

import classes from './Donation.module.scss';

const Donation = () => {
  const { potID } = useParams();
  const { addToast } = useToasts();

  const [potInfo, setPotInfo] = useState({
    address: '',
    desc: '',
    imageURL: '',
    openFrom: '',
    to: '',
  });
  const [typeOfDonation, setTypeOfDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const changeTypeOfDonationHandler = (event) => {
    const id = event.target.id;
    setTypeOfDonation(id);
  };

  const changePopupState = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const getPotInfo = async () => {
      const response = await fetchController(TYPE.VIEW_A_POT, { id: potID });

      const openFromTime = response.data.Pot[0].openFrom;
      const openFrom = openFromTime.substring(0, openFromTime.length - 3);
      const toTime = response.data.Pot[0].to;
      const to = toTime.substring(0, toTime.length - 3);
      setPotInfo({ ...response.data.Pot[0], openFrom, to });
    };

    getPotInfo();
  }, [potID]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (typeOfDonation) {
      const response = await fetchController(
        TYPE.ADD_DONATION,
        {
          potId: potID,
          donationType: typeOfDonation,
        },
        { token: localStorage.getItem('userIdentifier') }
      );

      setLoading(false);
      if (response.status === 200) {
        changePopupState();
        return addToast('Donación agregada correctamente.', {
          appearance: 'success',
          autoDismiss: '10000',
        });
      }

      if (response.status === 401) {
        return addToast('Inicia sesión para poder donár.', {
          appearance: 'error',
          autoDismiss: '10000',
        });
      }

      if (response.status) {
        addToast(`Error: ${response.data.message}`, {
          appearance: 'error',
          autoDismiss: '10000',
        });
      }
    } else {
      setLoading(false);
      addToast('Seleccione un tipo de donación.', {
        appearance: 'warning',
        autoDismiss: '5000',
      });
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <DonationConfirmation {...potInfo} isOpen={isOpen} changePopupState={changePopupState}/>
      <section className={classes.container}>
        <div className={classes.content}>
          <form onSubmit={submitHandler} className={classes.information}>
            <div className={classes['title-container']}>
              <h1 className={classes.title}>
                ¿Quiénes somos y a
                <span className={classes['title-highlight']}> QUIÉNES </span>
                ayudamos?
              </h1>
            </div>
            <div className={classes['form-content']}>
              <p>{potInfo.desc}</p>
              <span>
                horario: {potInfo.openFrom} : {potInfo.to}
              </span>
              <span>{potInfo.address}</span>
              <div className={classes.options}>
                <label className={classes.option} htmlFor='food'>
                  <span>Alimentos</span>
                  <input
                    className={classes.checkbox}
                    type='radio'
                    name='typeOfDonation'
                    id='Food'
                    onClick={changeTypeOfDonationHandler}
                  />
                </label>
                <label className={classes.option} htmlFor='money'>
                  <span>Dinero</span>
                  <input
                    className={classes.checkbox}
                    type='radio'
                    name='typeOfDonation'
                    id='Money'
                    onClick={changeTypeOfDonationHandler}
                  />
                </label>
              </div>
              <button className={classes.button} type='submit'>
                Donar
                <Arrow className={classes.icon} />
              </button>
            </div>
          </form>
          <div className={classes['image-container']}>
            <img className={classes.image} src={potInfo.imageURL} alt='pot' />
          </div>
        </div>
      </section>
    </>
  );
};

export default Donation;
