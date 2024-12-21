import css from './Details.module.css';
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
const Details = ({ camper }) => {
  const {
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
    form,
    length,
    width,
    height,
    tank,
    consumption,
  } = camper;
  return (
    <div className={css.container}>
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
      <h3 className={css.title}>Vehicle details</h3>
      <div className={css.info_container}>
        <div className={css.info_box}>
          <h4 className={css.subtitle}>Form</h4>
          <p className={css.text}>{form}</p>
        </div>
        <div className={css.info_box}>
          <h4 className={css.subtitle}>Length</h4>
          <p className={css.text}>{length}</p>
        </div>
        <div className={css.info_box}>
          <h4 className={css.subtitle}>Width</h4>
          <p className={css.text}>{width}</p>
        </div>
        <div className={css.info_box}>
          <h4 className={css.subtitle}>Height</h4>
          <p className={css.text}>{height}</p>
        </div>
        <div className={css.info_box}>
          <h4 className={css.subtitle}>Tank</h4>
          <p className={css.text}>{tank}</p>
        </div>
        <div className={css.info_box}>
          <h4 className={css.subtitle}>Consumption</h4>
          <p className={css.text}>{consumption}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
