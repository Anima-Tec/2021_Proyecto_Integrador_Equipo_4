/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import Popup from 'reactjs-popup';
import classes from './Registro.module.scss';
import '../../../node_modules/reactjs-popup/dist/index.css';

const Registro = () => {
  /*const [nombre, setNombre] = usestate('');
  const [apellido, setApellido] = usestate('');
  const [mail, setMail] = usestate('');
  const [contrasenia, setContrasenia] = usestate('');
  const [confirmarCotrasenia, setConfirmarContrasenia] = usestate('');*/

  const handlesubmit = () => {
    e.preventdefault();
  };

  return (
    <Popup trigger={<button className={classes.registroButton}>Registrarse</button>}
      modal
    >
      <div className={classes.modal}>
        <div className={classes.registroHeader}>
          <p>Registrate para continuar</p>
        </div>
        <div className={classes.registroBody}>
          <form onSubmit={(handlesubmit)}>
            <input type="text" placeholder="Nombre" id="nombre" value onChange={(e) => setNombre(e.target.vaule)} />

            <input type="text" placeholder="Apellido" id="Apellido" value onChange={(e) => setApellido(e.target.vaule)} />

            <input type="text" placeholder="Mail" id="mail" value onChange={(e) => setMail(e.target.vaule)} />

            <input type="password" placeholder="Contraseña" id="contrasenia" value onChange={(e) => setContrasenia(e.target.vaule)} />

            <input type="password" placeholder="Confirmar Contraseña" id="confirmarCotrasenia" value onChange={(e) => setConfirmarContrasenia(e.target.vaule)} />

            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </Popup>
  );
}
export default Registro;