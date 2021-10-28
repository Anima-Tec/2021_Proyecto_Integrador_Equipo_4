import { useState } from 'react';
import { Tab, Box } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import { Search as SearchIcon } from '@material-ui/icons/';

import ViewMyPots from '../../components/ViewMy/ViewMyPots';
import ViewMyDonations from '../../components/ViewMy/ViewMyDonations';
import classes from './Control.module.scss';

const Control = () => {
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
              <ViewMyPots/>
            </TabPanel>
            <TabPanel value='2'>
              <ViewMyDonations />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Control;
