import React from "react";
import {
    Add as AddIcon
} from '@material-ui/icons/';

import notFoundImg from '../../../../assets/images/NotFoundImg.png'
import classes from './NotFound.module.scss'

const NotFound = () => {

    const createPot = () => {
        window.location.href='/'
    }
    
    return (
        <div className={classes['container']}>
            <div className={classes['container-img']}>
                <img src={notFoundImg} alt='notFoundImg' />
            </div>

            <div className={classes['container-text']}>

                <div className={classes['container-first-text']}>
                <h1 className={classes.title}>Si quieres ser un creador de</h1>
                <h1 className={classes['mayus-text']}>OLLA POPULAR </h1>
                <h1 className={classes.title2}> puedes hacerlo</h1>
                </div>

                <button className={classes['create-pot-button']} onClick={createPot}><AddIcon />Crear olla</button>
                <p className={classes.text}>Las ollas populares son creadas con el fin de unir a posibles donadores con sus destinatarios con la posibilidad de recibir DINERO y/o PRODUCTOS para seguir sustentandose.</p>
            </div>
        </div>
    );
}

export default NotFound;