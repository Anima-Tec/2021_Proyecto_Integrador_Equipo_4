import { useRef, useState } from 'react';
import classes from './Activation.module.scss';

const Activation = () => {
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
    const actualIndex = event.target.tabIndex;
    const inputLength = event.target.value.length;
    const inputName = event.target.name;
    const inputValue = event.target.value;
    changeFocus(actualIndex, inputLength);
    tokenDataChangeHandler(inputName, inputValue);
  };

  return (
    <div className={classes['principal-content']}>
      <div className={classes.activation}>
        <header className={classes.title}>
          <h2>¡Activa tu cuenta!</h2>
        </header>
        <section className={classes.content}>
          <input
            ref={fields[0]}
            tabIndex='0'
            type='text'
            pattern='\d*'
            maxlength='1'
            onChange={switchInput}
            name='firstField'
          />
          <input
            ref={fields[1]}
            onChange={switchInput}
            tabIndex='1'
            type='text'
            pattern='\d*'
            maxlength='1'
            name='secondField'
          />
          <input
            ref={fields[2]}
            onChange={switchInput}
            tabIndex='2'
            type='text'
            pattern='\d*'
            maxlength='1'
            name='thirdField'
          />
          <input
            ref={fields[3]}
            onChange={switchInput}
            tabIndex='3'
            type='text'
            pattern='\d*'
            maxlength='1'
            name='fourthField'
          />
          <input
            ref={fields[4]}
            onChange={switchInput}
            tabIndex='4'
            type='text'
            pattern='\d*'
            maxlength='1'
            name='fifthField'
          />
          <input
            ref={fields[5]}
            onChange={switchInput}
            tabIndex='5'
            type='text'
            pattern='\d*'
            maxlength='1'
            name='sixthField'
          />
        </section>
      </div>
    </div>
  );
};

export default Activation;
