import React from "react";
import classes from "./Spinner.module.scss";

const Spinner = () => (
  <div>
    <div className={classes['spinner']}></div>
    <div className={classes['carga']}></div>
  </div>
);

export default Spinner;
