import { useRef } from 'react';
import Popup from 'reactjs-popup';

import donationImage from '../../assets/images/ConfirmationDonation.PNG';
import Donation from '../../pages/Donation';
import classes from './DonationConfirmation.module.scss';

const DonationConfirmation = ({authorEmail, isOpen, changePopupState}) => {
  return (
    <Popup
    open={isOpen}
    modal
    className={classes['d-popup-content']}
    >
        <div className={classes['d-confirm-container']}>
          <button className={classes.close} onClick={changePopupState}>
            &times;
          </button>
          <div className={classes['d-info-container']}>
            <div className={classes['d-info-part-one']}>
              <div className={classes['d-info-tittle']}>
                <h1>Tu contacto de</h1>
                <h1 className={classes['part-text-donation']}> DONACION </h1>
                <h1>ha sido enviado</h1>
              </div>
              <p className={classes['d-info-text']}>
                Tus datos de contacto de donador han sido enviados al dueño de
                la olla
              </p>
              <div className={classes['d-info-owner']}>
                <p className={classes['owner-title']}>Dueño de olla:</p>
                <br />
                <span className={classes['owner-email']}>{authorEmail}</span>
              </div>
            </div>
            <div className={classes['d-info-part-two']}>
              <div className={classes['d-info-img']}>
                <img src={donationImage} alt="Info-logo" />
              </div>
            </div>
          </div>
        </div>
    </Popup>
  );
};

export default DonationConfirmation;
