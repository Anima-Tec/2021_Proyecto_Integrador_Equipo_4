import { useState } from 'react';
import { Tab, Box } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import { Search as SearchIcon } from '@material-ui/icons/';

import VerMisOllas from '../../components/Management/VerMisOllas';
import VerMisDonaciones from '../../components/Management/VerMisDonaciones';
import classes from './Manage.module.scss';

const Administrar = () => {
  const [value, setValue] = useState('2');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <div className={classes['manage-container']}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <div className={classes['manage-header']}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                  <Tab
                    className={classes['pots-tab']}
                    label='Mis ollas'
                    value='1'
                    icon={<SearchIcon />}
                  />
                  <Tab
                    className={classes['donations-tab']}
                    label='Mis Donaciones'
                    value='2'
                    icon={<SearchIcon />}
                  />
                </TabList>
              </Box>
            </div>

            <TabPanel value='1'>
              <VerMisOllas />
            </TabPanel>
            <TabPanel value='2'>
              <VerMisDonaciones />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Administrar;
