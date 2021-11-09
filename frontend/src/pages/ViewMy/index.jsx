import { useState } from 'react';
import { Tab, Box } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import { Search as SearchIcon } from '@material-ui/icons/';

import ViewMyPots from '../../components/ViewMy/ViewMyPots';
import ViewMyDonations from '../../components/ViewMy/ViewMyDonations';
import classes from './ViewMy.module.scss';

const ViewMy = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <div className={classes['viewMy-container']}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <div className={classes['viewMy-header']}>
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
            <div className={classes['container-content']}>
            <TabPanel value='1'>
              <ViewMyPots/>
            </TabPanel>
            <TabPanel value='2'>
              <ViewMyDonations />
            </TabPanel>
            </div>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default ViewMy;
