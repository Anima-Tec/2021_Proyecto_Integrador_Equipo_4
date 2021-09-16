import React from 'react';
import classes from './Home.module.scss';
import {
  //Add as AddIcon,
  //Search as SearchIcon,
} from '@material-ui/icons/';
import CrearOllas from '../../ollas/Crear-ollas';
import BuscarOllas from '../../ollas/Crear-ollas';
import { Tab, Tabs, } from '@material-ui/core';
import TabPanel from '@material-ui/lab/TabPanel';
import PropTypes from 'prop-types';



const Home = () => {
  const [value, setValue] = React.useState(2);

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>¿Vos colaborás?</h1>
      <p className={classes.description}>Ayuda a las familias uruguayas de todo el país colaborando con las ollas asociadas</p>

      <div className={classes['ollas-container']}>

        <div className={classes['header-ollas']}>
          <Tabs
            value={value}
            textColor="primary"
            indicatorColor="primary"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <Tab className={classes['buscar-olla']} label="Buscar Olla" value="1"/>
            <Tab className={classes['agregar-olla']} label="Agregar olla" value="2"/>
          </Tabs>
        </div>

        <TabPanel value={1} index={1}><BuscarOllas/></TabPanel>
        <TabPanel value={2} index={2}><CrearOllas/></TabPanel>

        <img className={classes['img-home']} src="../../../assets/images/image-home.png" alt="" />

      </div>
    </div>
  )
}
export default Home
