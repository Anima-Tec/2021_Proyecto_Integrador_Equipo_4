import { useState } from 'react';
import classes from './Home.module.scss';
import imageHome from '../../assets/images/Image-home.png';
import CrearOllas from '../../components/Ollas/CrearOllas';
import BuscarOllas from '../../components/Ollas/BuscarOllas';
import { Tab, Box } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';

const Home = () => {
  const [value, setValue] = useState('2');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <div className={classes['home-container']}>
        <h1 className={classes.title}>¿Vos colaborás?</h1>
        <p className={classes.description}>
          Ayuda a las familias uruguayas de todo el país colaborando con las
          ollas asociadas
        </p>

        <div className={classes['ollas-container']}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <div className={classes['header-ollas']}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab label='Buscar Ollas' value='1' disabled />
                    <Tab label='Agregar ollas' value='2' />
                  </TabList>
                </Box>
              </div>

              <TabPanel value='1'>
                <BuscarOllas />
              </TabPanel>
              <TabPanel value='2'>
                <CrearOllas />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>

      <div className={classes['img-container']}>
        <img className={classes['img-home']} src={imageHome} alt='img' />
      </div>
    </div>
  );
};

export default Home;
