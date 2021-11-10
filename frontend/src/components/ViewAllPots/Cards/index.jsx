import { useHistory } from 'react-router';
import helpPotsImg from '../../../assets/images/imagesCards/HelpPotsImage.png';
import noNeedPotsImg from '../../../assets/images/imagesCards/NoNeedPotsImage.png';
import NotFoundPotImg from '../../../assets/images/imagesCards/notFoundImagePot.png';
import paths from '../../../router/paths';
import classes from './Cards.module.scss';

const Cards = ({ id, imageURL, isInNeed, name }) => {
  const history = useHistory();

  const goToPotHandler = () => history.push(`${paths.DONATE}/${id}`);

  return (
    <div className={classes.cards} key={id} onClick={goToPotHandler}>
      <div className={classes['container-img']}>
        {imageURL != null ? (
          <img className={classes.img} src={imageURL} alt='img' />
        ) : (
          <img className={classes.img} src={NotFoundPotImg} alt='img' />
        )}

        {isInNeed === 0 && (
          <img
            className={classes['state-img']}
            src={noNeedPotsImg}
            alt='noNeed'
          />
        )}
        {isInNeed === 1 && (
          <img className={classes['state-img']} src={helpPotsImg} alt='help' />
        )}
      </div>

      <h2 className={classes.name}>{name}</h2>

      {isInNeed === 0 && (
        <button className={classes['state-1']}>Olla sin necesidad</button>
      )}
      {isInNeed === 1 && (
        <button className={classes['state-0']}>Olla con necesidad</button>
      )}
    </div>
  );
};
export default Cards;
