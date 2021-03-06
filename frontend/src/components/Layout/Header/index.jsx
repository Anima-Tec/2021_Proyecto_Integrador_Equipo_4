import { useEffect, useState } from 'react';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

import paths from '../../../router/paths';
import Register from '../../Register';
import Login from '../../Login';
import logo from '../../../assets/images/logo.png';
import classes from './Header.module.scss';
import fetchController from '../../../Networking/fetch-controller';
import TYPE from '../../../Networking/requestTypes';

const Header = () => {
  let history = useHistory();
  const [isLogged, setIsLogged] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem('userIdentifier') || null
  );

  const toggleHandler = () => {
    isToggled ? setIsToggled(false) : setIsToggled(true);
  };

  const changeTokenState = (newState) => {
    setAuthToken(newState);
  };

  useEffect(() => {
    authToken ? setIsLogged(true) : setIsLogged(false);
  }, [authToken]);

  const logOutHandler = async () => {
    await fetchController(
      TYPE.LOG_OUT,
      {},
      { token: localStorage.getItem('userIdentifier') }
    );

    localStorage.removeItem('userIdentifier');
    setAuthToken(localStorage.getItem('userIdentifier'));
  };

  const ViewPots = () => {
    history.push(paths.VIEW_MY)
  }

  const goHome = () => {
    history.push(paths.HOME)
  }

  const defaultToggleClasses = `${classes['pointer-no-selectable']} ${classes.toggler}`;

  return (
    <header className={classes.header}>
      <ul>
        <div className={classes['logo-toggler']}>
          <li className={`${classes.logo} ${classes['pointer-no-selectable']}`} onClick={goHome}>
            <img src={logo} alt='logo' />
            <h1 className={classes.title}>
              <span className={classes['title__first-half']}>brak</span>
              <span className={classes['title__second-half']}>adevi</span>
            </h1>
          </li>

          <li
            onClick={toggleHandler}
            className={
              isToggled
                ? `${defaultToggleClasses} ${classes['toggler-active']}`
                : defaultToggleClasses
            }
          >
            <FontAwesomeIcon
              icon={faBars}
              className={classes['toggler-icon']}
            />
          </li>
        </div>

        <div
          className={
            window.innerWidth <= 1023
              ? !isToggled
                ? `${classes['display-none']}`
                : classes['nav-content']
              : classes['nav-content']
          }
        >
          <li className={classes['view']}>
            <SearchIcon className={classes['search-icon']} />
            <h4
              className={`${classes['view__title']} ${classes['pointer-no-selectable']}`}
              onClick={ViewPots}
            >
              Mis ollas
            </h4>
          </li>
          <li className={classes.buttons}>
            {isLogged ? (
              <button
                className={`${classes.button} ${classes['logout-button']}`}
                onClick={logOutHandler}
              >
                <PersonIcon className={classes['person-icon']} /> Cerrar Sesi??n
              </button>
            ) : (
              <>
                <Login login={changeTokenState}>
                  <button className={classes.button}>
                    <PersonIcon className={classes['person-icon']} /> Iniciar
                    Sesi??n
                  </button>
                </Login>
                <Register>
                  <button
                    className={`${classes['register-button']} ${classes['button']}`}
                  >
                    <PersonAddIcon className={classes['person-icon']} />{' '}
                    Registrarme
                  </button>
                </Register>
              </>
            )}
          </li>
        </div>
      </ul>
    </header>
  );
};

export default Header;
