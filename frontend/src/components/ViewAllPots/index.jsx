import { useState } from "react";
import { TabPanel, TabContext, TabList } from "@material-ui/lab";
import { Tab, Box } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons/";

import AllPots from "./AllPots";
import PotsInNeed from "./PotsInNeed";
import classes from "./ViewAllPots.module.scss";

const ViewAllPots = () => {
  const [value, setValue] = useState("1");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes["pots-container"]}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <div className={classes["pots-header"]}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab
                    className={classes["all-pots-tab"]}
                    label="Buscar ollas"
                    icon={<SearchIcon />}
                    value="1"
                  />
                  <Tab
                    className={classes["pots-in-need-tab"]}
                    label="Crear ollas"
                    icon={<SearchIcon />}
                    value="2"
                  />
                </TabList>
              </Box>
            </div>

            <TabPanel value="1">
              <AllPots />
            </TabPanel>
            <TabPanel value="2">
              <PotsInNeed />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default ViewAllPots;
