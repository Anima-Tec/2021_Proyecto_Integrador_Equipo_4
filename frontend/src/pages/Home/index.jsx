import { useState } from 'react';
import { Tab, Box } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';

import CreatePots from '../../components/Ollas/CreatePots';
import SearchPots from '../../components/Ollas/SearchPots';
import ViewAllPots from '../../components/ViewAllPots';
import imageHome from '../../assets/images/Image-home.png';
import classes from './Home.module.scss';

const Home = () => {
  const [value, setValue] = useState('2');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <div className={classes.container}>
      <div className={classes['home-container']}>
        <h1 className={classes.title}>¿Vos colaborás?</h1>
        <p className={classes.description}>
          Ayuda a las familias uruguayas de todo el país colaborando con las
          ollas asociadas
        </p>

        <div className={classes['pots-container']}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <div className={classes['header-pots']}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab label='Buscar Ollas' value='1' />
                    <Tab label='Agregar ollas' value='2' />
                  </TabList>
                </Box>
              </div>

              <TabPanel value='1'>
                <SearchPots />
              </TabPanel>
              <TabPanel value='2'>
                <CreatePots />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>

      <div className={classes['img-container']}>
        <img className={classes['img-home']} src={imageHome} alt='img' />
      </div>
    </div>

  <div className={classes.container2}>
    <ViewAllPots/>
  </div>
  </>
  );
};

export default Home;
