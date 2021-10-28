import { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import fetchController from '../../Networking/fetch-controller';
import TYPE from '../../Networking/requestTypes';

import classes from './Activation.module.scss';

const Activation = () => {
  const { addToast } = useToasts();

  const [email, setEmail] = useState('');
  const [tokenFields, setTokenFields] = useState({
    firstField: '',
    secondField: '',
    thirdField: '',
    fourthField: '',
    fifthField: '',
    sixthField: '',
  });

  const firstField = useRef();
  const secondField = useRef();
  const thirdField = useRef();
  const fourthField = useRef();
  const fifthField = useRef();
  const sixthField = useRef();

  const fields = [
    firstField,
    secondField,
    thirdField,
    fourthField,
    fifthField,
    sixthField,
  ];

  useEffect(() => {
    addToast(
      'Un token fue enviado a tu correo, confirma tu cuenta ingresandolo.',
      {
        appearance: 'success',
        autoDismiss: '10000',
      }
    );
  }, [addToast]);

  const changeFocus = (actualIndex, inputValueLength) => {
    if (inputValueLength > 0) {
      if (actualIndex < 5) {
        const nextField = actualIndex + 1;
        fields[nextField].current.focus();
      } else {
        fields[actualIndex].current.blur();
      }
    }
  };

  const tokenDataChangeHandler = (inputName, inputValue) => {
    setTokenFields((prevState) => ({ ...prevState, [inputName]: inputValue }));
  };

  const switchInput = (event) => {
    const actualIndex = event.target.tabIndex - 1;
    const inputLength = event.target.value.length;
    const inputName = event.target.name;
    const inputValue = event.target.value.replace(/[^\d]/g, '');
    event.target.value = inputValue;

    if (event.target.value !== '') {
      changeFocus(actualIndex, inputLength);
      tokenDataChangeHandler(inputName, inputValue);
    }
  };

  const updateEmail = (event) => setEmail(event.target.value);

  const confirmToken = async (event) => {
    event.preventDefault();
    const {
      firstField,
      secondField,
      thirdField,
      fourthField,
      fifthField,
      sixthField,
    } = tokenFields;

    const token = `${firstField}${secondField}${thirdField}${fourthField}${fifthField}${sixthField}`;
    const response = await fetchController(TYPE.ACTIVATE_ACCOUNT, {
      email,
      token,
    });

    if (response.status === 200) {
      addToast('Cuenta activada correctamente.', {
        appearance: 'success',
        autoDismiss: '10000',
      });
    } else {
      addToast('Token o email invalidos.', {
        appearance: 'error',
        autoDismiss: '2000',
      });
    }
  };

  return (
    <div className={classes['principal-content']}>
      <div className={classes.activation}>
        <header className={classes.header}>
          <h2 className={classes.title}>¡Activa tu cuenta!</h2>
        </header>
        <form className={classes.form} onSubmit={confirmToken}>
          <span className={classes.email}>
            <label className={classes['email-label']} htmlFor='email'>
              Email&ensp;
            </label>
            <input
              type='email'
              onChange={updateEmail}
              placeholder='example@example.com'
              name='email'
              id='email'
              className={classes['email-input']}
            />
          </span>
          <section className={classes.fields}>
            <input
              ref={fields[0]}
              tabIndex='1'
              type='text'
              maxLength='1'
              onChange={switchInput}
              name='firstField'
              className={classes['input-fields']}
            />
            <input
              ref={fields[1]}
              onChange={switchInput}
              tabIndex='2'
              type='text'
              maxLength='1'
              name='secondField'
              className={classes['input-fields']}
            />
            <input
              ref={fields[2]}
              onChange={switchInput}
              tabIndex='3'
              type='text'
              maxLength='1'
              name='thirdField'
              className={classes['input-fields']}
            />
            <input
              ref={fields[3]}
              onChange={switchInput}
              tabIndex='4'
              type='text'
              maxLength='1'
              name='fourthField'
              className={classes['input-fields']}
            />
            <input
              ref={fields[4]}
              onChange={switchInput}
              tabIndex='5'
              type='text'
              maxLength='1'
              name='fifthField'
              className={classes['input-fields']}
            />
            <input
              ref={fields[5]}
              onChange={switchInput}
              tabIndex='6'
              type='text'
              maxLength='1'
              name='sixthField'
              className={classes['input-fields']}
            />
          </section>
          <button className={classes['submit-button']} type='submit'>
            Confirmar cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Activation;
