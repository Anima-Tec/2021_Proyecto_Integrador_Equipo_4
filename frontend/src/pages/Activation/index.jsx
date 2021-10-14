import { useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
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
    debugger;
    const actualIndex = event.target.tabIndex - 1;
    const inputLength = event.target.value.length;
    const inputName = event.target.name;
    const inputValue = event.target.value.replace(/[^\d.]/g, '');
    event.target.value = inputValue;

    if (event.target.value !== '') {
      changeFocus(actualIndex, inputLength);
      tokenDataChangeHandler(inputName, inputValue);
    }
  };

  const updateEmail = (event) => setEmail(event.target.value);

  const confirmToken = (event) => {
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
    console.log(email, token);
    addToast('success', { appearance: 'success', autoDismiss: '1000' });
  };

  return (
    <div className={classes['principal-content']}>
      <div className={classes.activation}>
        <header className={classes.title}>
          <h2>¡Activa tu cuenta!</h2>
        </header>
        <form className={classes.form} onSubmit={confirmToken}>
          <span className={classes.email}>
            <label htmlFor='email'>Email</label>
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
          <button type='submit'>Confirmar cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default Activation;
