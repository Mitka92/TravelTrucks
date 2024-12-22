import { selectFavorite } from '../../redux/campers/selectors.js';
import Icon from '../Icon/Icon.jsx';
import css from './CampersListItem.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/campers/slice.js';
import Button from '../Button/Button.jsx';
const CampersListItem = ({
  id,
  name,
  price,
  rating,
  location,
  description,
  reviews,
  gallery,
  AC,
  bathroom,
  kitchen,
  TV,
  radio,
  refrigerator,
  microwave,
  gas,
  water,
  engine,
  transmission,
}) => {
  const dispatch = useDispatch();
  const favoriteCampers = useSelector(selectFavorite); // Отримуємо список улюблених кемперів з Redux

  const handleClick = () => {
    console.log(id);
    dispatch(toggleFavorite(id)); // Викликаємо action для додавання або видалення ID з улюблених
  };

  const isFavorite = favoriteCampers.includes(id); // Перевіряємо, чи цей кемпер вже в улюблених

  return (
    <li className={css.item}>
      <img className={css.image} src={gallery[0].thumb} />
      <div className={css.info_container}>
        <div className={css.thumb}>
          <div className={css.thumb_1}>
            <h2 className={css.name}>{name}</h2>
            <span>
              {' '}
              <p className={css.price}>&#x20AC;{price}.00</p>
              <Icon
                id={'icon-heart'}
                size="24px"
                className={isFavorite ? css.heartIconFilled : css.heart_icon} // Динамічно вибираємо клас із CSS модуля
                onClick={handleClick} // Обробник кліку для додавання/видалення з улюблених
              />
            </span>
          </div>

          <div className={css.thumb_2}>
            <Icon
              id="icon-star"
              className={css.rating_icon}
              stroke="none"
              fill="#FFC531"
              size="16px"
            />
            <div className={css.underline}>
              <p className={css.rating}>
                {rating}({reviews.length} Reviews)
              </p>
            </div>
            <div className={css.location_box}>
              {' '}
              <Icon
                className={css.rating_icon}
                id="icon-map"
                stroke="none"
                fill="inherit"
                size="16px"
              />
              <p className={css.location}>{location}</p>
            </div>
          </div>
        </div>

        <div className={css.thumb_3}>
          <p className={css.description}>{description}</p>
        </div>

        <div className={css.thumb_4}>
          {transmission === 'automatic' && (
            <div className={css.box}>
              <Icon className={css.icon} id="icon-diagram" size="20px" />
              <p className={css.option}>{transmission}</p>
            </div>
          )}
          <div className={css.box}>
            <Icon className={css.icon} id="icon-petrol" size="20px" />
            <p className={css.option}>{engine}</p>
          </div>
          {AC && (
            <div className={css.box}>
              <Icon className={css.icon} id="icon-wind" size="20px" />
              <p className={css.option}>AC</p>
            </div>
          )}
          {bathroom && (
            <div className={css.box}>
              <Icon className={css.icon} id="icon-shower" size="20px" />
              <p className={css.option}>Bathroom</p>
            </div>
          )}
          {kitchen && (
            <div className={css.box}>
              <Icon className={css.icon} id="icon-cup" size="20px" />
              <p className={css.option}>Kitchen</p>
            </div>
          )}
          {TV && (
            <div className={css.box}>
              <Icon className={css.icon} id="icon-tv" size="20px" />
              <p className={css.option}>TV</p>
            </div>
          )}
          {radio && (
            <div className={css.box}>
              <Icon className={css.icon} id="icon-radio" size="20px" />
              <p className={css.option}>Radio</p>
            </div>
          )}
          {refrigerator && (
            <div className={css.box}>
              <Icon className={css.icon} id="icon-refrigerator" size="20px" />
              <p className={css.option}>Refrigerator</p>
            </div>
          )}
          {microwave && (
            <div className={css.box}>
              <Icon
                className={css.icon}
                id="icon-microwave"
                size="20px"
                fill="none"
                stroke="#101828"
              />
              <p className={css.option}>Microwave</p>
            </div>
          )}
          {gas && (
            <div className={css.box}>
              <Icon
                className={css.icon}
                id="icon-gas"
                fill="none"
                stroke="#101828"
                size="20px"
              />
              <p className={css.option}>Gas</p>
            </div>
          )}
          {water && (
            <div className={css.box}>
              <Icon
                className={css.icon}
                id="icon-water"
                fill="none"
                stroke="#101828"
                size="20px"
              />
              <p className={css.option}>Water</p>
            </div>
          )}
        </div>
        <Link
          to={`/catalog/${id}/features`}
          target="_blank"
          rel="noopener noreferrer"
          replace
        >
          <Button text="Show more" className={css.button} />
        </Link>
      </div>
    </li>
  );
};

export default CampersListItem;
