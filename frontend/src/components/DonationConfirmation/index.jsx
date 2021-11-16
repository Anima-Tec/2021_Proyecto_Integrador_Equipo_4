import Popup from 'reactjs-popup';

import donationImage from '../../assets/images/ConfirmationDonation.PNG';
import classes from './DonationConfirmation.module.scss';

const DonationConfirmation = (props) => {
  const { authorEmail, showModal } = props;
  console.log(showModal);
  return (
      <Popup trigger={showModal}  modal className={classes['d-popup-content']}>
        {(close) => (
          <div className={classes['d-confirm-container']}>
            <button className={classes.close} onClick={close}>
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
                  <span className={classes['owner-name']}>(Insertar nombre)</span>
                  <br/>
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
        )}
      </Popup>
  );
};

export default DonationConfirmation;
