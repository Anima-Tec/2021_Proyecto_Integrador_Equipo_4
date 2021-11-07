import { useState } from 'react';
import { Tab, Box } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import {
  Add as AddIcon,
  Search as SearchIcon,
} from '@material-ui/icons/';

import CreatePots from './CreatePots';
import SearchPots from './SearchPots';
import classes from './Ollas.module.scss'

const Ollas = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes['ollas-container']}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <div className={classes['header-ollas']}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab
                  className={classes['search-tab']}
                  label='Buscar ollas'
                  icon={<SearchIcon/>}
                  value="1"
                />
                <Tab
                  className={classes['add-tab']}
                  label='Crear ollas'
                  icon={<AddIcon/>}
                  value='2'
                />
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
  );
};

export default Ollas;
