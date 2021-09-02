import classes from './Header.module.scss';
import logo from '../../assets/logo.png';
import { LocationOn, Map, Person } from '@material-ui/icons';
import { useState } from 'react';

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);

  const logInHandler = () => {
    setIsLogged(true);
  };
  const logOutHandler = () => {
    setIsLogged(false);
  };

  return (
    <header className={classes.header}>
      <ul>
        <li className={classes.logo}>
          <img src={logo} alt='logo' />
          <h1 className={classes.title}>
            <span className={classes['title__first-half']}>brak</span>
            <span className={classes['title__second-half']}>adevi</span>
          </h1>
        </li>
        <li className={classes.ubication}>
          <h4>Ubicación: </h4>
          <p>
            <LocationOn className={classes['location-icon']} />
            Current Location
            <span className={classes['actual-location']}>
              Location placeholder
            </span>
          </p>
        </li>
        <div className={classes.div}>
          <li onClick={() => console.log('si')} className={classes['view-map']}>
            <Map className={classes['map-icon']} />
            <h4>Ver mapa</h4>
          </li>
          <li className={classes.buttons}>
            {!isLogged && (
              <button onClick={logInHandler}>
                <Person className={classes['person-icon']} /> Iniciar Sesión
              </button>
            )}
            {isLogged && (
              <button onClick={logOutHandler}>
                <Person className={classes['person-icon']} /> Cerrar Sesión
              </button>
            )}
          </li>
        </div>
      </ul>
    </header>
  );
};

export default Header;
