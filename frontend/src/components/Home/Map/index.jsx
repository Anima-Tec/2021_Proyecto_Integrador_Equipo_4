import GoogleMap from './GoogleMap';

import classes from './Map.module.scss';

const Map = () => {
  return (
    <section className={classes.section}>
      <GoogleMap />
    </section>
  );
};

export default Map;
