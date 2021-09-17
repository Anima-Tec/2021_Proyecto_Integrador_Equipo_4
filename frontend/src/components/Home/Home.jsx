import React from 'react';
import classes from './Home.module.scss';
import {
  //Add as AddIcon,
  //Search as SearchIcon,
} from '@material-ui/icons/';
import CrearOllas from '../ollas/Crear-ollas';
import BuscarOllas from '../ollas/Crear-ollas';
import { Tab, Box} from '@material-ui/core';
import { TabPanel, TabContext, TabList} from '@material-ui/lab';

const Home = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>¿Vos colaborás?</h1>
      <p className={classes.description}>Ayuda a las familias uruguayas de todo el país colaborando con las ollas asociadas</p>

      <div className={classes['ollas-container']}>

        <div className={classes['header-ollas']}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Buscar Ollas" value="1" />
            <Tab label="Agregar ollas" value="2" />
          </TabList>
          </Box>

            <TabPanel value="1"><BuscarOllas/></TabPanel>
            <TabPanel value="2"><CrearOllas/></TabPanel>

          </TabContext>
          </Box>

        </div>
        <img className={classes['img-home']} src="../../../assets/images/image-home.png" alt="" />

      </div>
    </div>
  )
}
export default Home
