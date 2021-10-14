import React from 'react';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@material-ui/icons/';

import classes from './VerMisOllas.module.scss';
import imgPrueba from '../../../assets/images/img-prueba.jpg';

import fetchController from '../../../Networking/fetch-controller';
import TYPE from '../../../Networking/requestTypes';

const VerMisOllas = () => {
  return (
    <div className={classes.container}>
      <div className={classes['container-content']}>
        <h1 className={classes.title}>Benito camelo</h1>
        <button className={classes.state}>Olla sin necesidad</button>
        <p className={classes.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          aliquam obcaecati tempora cum? Amet, facilis exercitationem, minima
          hic, ipsam culpa officiis possimus iure reiciendis quo sunt. Molestias
          nemo repudiandae voluptates. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Temporibus porro expedita distinctio ipsum autem,
          exercitationem mollitia incidunt molestiae at dolorum repudiandae.
          Distinctio in atque eligendi sunt ab dolor est quae! Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. Doloribus blanditiis odio
          ipsam id vel dolorem nisi pariatur deleniti, nostrum iste, quas atque
          cum quia delectus earum expedita quibusdam sunt voluptatibus. Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Fugiat dicta
          labore atque, autem dolores assumenda debitis adipisci quos minima
          laborum quidem incidunt cupiditate inventore? Quibusdam quo obcaecati
          nihil sed vitae!
        </p>
        <p className={classes.time}>Horario: 10:00 - 01:00</p>
        <button className={classes['edit-button']}>
          Editar olla popular <ArrowForwardIosIcon/>
        </button>
      </div>

      <div className={classes['container-img']}>
        <img className={classes.img} src={imgPrueba} alt='img-prueba' />
      </div>
    </div>
  );
};
export default VerMisOllas;
