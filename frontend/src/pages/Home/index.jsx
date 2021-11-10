import ViewAllPots from '../../components/ViewAllPots';
import Ollas from '../../components/Ollas';
import imageHome from '../../assets/images/Image-home.png';
import classes from './Home.module.scss';

const Home = () => {
  
  return (
    <>
    <div className={classes.container}>
      <div className={classes['home-container']}>
        <h1 className={classes.title}>¿Vos colaborás?</h1>
        <p className={classes.description}>
          Ayuda a las familias uruguayas de todo el país colaborando con las
          ollas asociadas
        </p>

        <Ollas/>
        
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
