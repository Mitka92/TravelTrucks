import css from './CampersListItem.module.css';
import { Link } from 'react-router-dom';
import sprite from '../../img/icons/sprite.svg';

const Icon = ({ id, fill, size, className, stroke, ...props }) => (
  <svg
    className={`${css.icon} ${className || ''}`.trim()}
    width={size}
    height={size}
    {...props}
  >
    <use xlinkHref={`${sprite}#${id}`} style={{ fill: fill, stroke: stroke }} />
  </svg>
);
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
              <Icon id="icon-heart" size="24px" className={css.heart_icon} />
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
            <p className={css.rating}>
              {rating}({reviews.length} Reviews)
            </p>
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

        <div className={css.thumb_3}>
          <p className={css.description}>{description}</p>
        </div>

        <div className={css.thumb_4}>
          {transmission === 'automatic' && (
            <div className={css.box}>
              <Icon id="icon-diagram" size="20px" />
              <p className={css.option}>{transmission}</p>
            </div>
          )}
          <div className={css.box}>
            <Icon id="icon-petrol" size="20px" />
            <p className={css.option}>{engine}</p>
          </div>
          {AC && (
            <div className={css.box}>
              <Icon id="icon-wind" size="20px" />
              <p className={css.option}>AC</p>
            </div>
          )}
          {bathroom && (
            <div className={css.box}>
              <Icon id="icon-shower" size="20px" />
              <p className={css.option}>Bathroom</p>
            </div>
          )}
          {kitchen && (
            <div className={css.box}>
              <Icon id="icon-cup" size="20px" />
              <p className={css.option}>Kitchen</p>
            </div>
          )}
          {TV && (
            <div className={css.box}>
              <Icon id="icon-tv" size="20px" />
              <p className={css.option}>TV</p>
            </div>
          )}
          {radio && (
            <div className={css.box}>
              <Icon id="icon-radio" size="20px" />
              <p className={css.option}>Radio</p>
            </div>
          )}
          {refrigerator && (
            <div className={css.box}>
              <Icon id="icon-refrigerator" size="20px" />
              <p className={css.option}>Refrigerator</p>
            </div>
          )}
          {microwave && (
            <div className={css.box}>
              <Icon
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
              <Icon id="icon-gas" fill="none" stroke="#101828" size="20px" />
              <p className={css.option}>Gas</p>
            </div>
          )}
          {water && (
            <div className={css.box}>
              <Icon id="icon-water" fill="none" stroke="#101828" size="20px" />
              <p className={css.option}>Water</p>
            </div>
          )}
        </div>
        <Link
          to={`/catalog/${id}/features`}
          // target="_blank"
          // rel="noopener noreferrer"
          // replace
        >
          <button className={css.button}>Show more</button>
        </Link>
      </div>
    </li>
  );
};

export default CampersListItem;
