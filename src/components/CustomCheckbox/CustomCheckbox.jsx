import { Formik, Field, Form } from 'formik';
import css from './CustomCheckbox.module.css';
import sprite from '../../img/icons/sprite.svg';
import Select from 'react-select'; // Імпорт Select з react-select
import { useSelector } from 'react-redux';
import { selectUniqueLocations } from '../../redux/campers/selectors.js';

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

const icons = [
  {
    id: 'ac',
    label: 'AC',
    icon: <Icon id="icon-wind" className={css.icon} size="32px" />,
  },
  {
    id: 'automatic',
    label: 'Automatic',
    icon: <Icon id="icon-diagram" className={css.icon} size="32px" />,
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: <Icon id="icon-cup" className={css.icon} size="32px" />,
  },
  {
    id: 'tv',
    label: 'TV',
    icon: <Icon id="icon-tv" className={css.icon} size="32px" />,
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: <Icon id="icon-shower" className={css.icon} size="32px" />,
  },
];

// Дані для радіокнопок
const vehicleTypes = [
  {
    id: 'panelTruck',
    label: 'Van',
    icon: <Icon id="icon-bi_grid_1x2" className={css.icon} size="32px" />,
  },
  {
    id: 'fullyIntegrated',
    label: 'Fully Integrated',
    icon: <Icon id="icon-bi_grid" className={css.icon} size="32px" />,
  },
  {
    id: 'alcove',
    label: 'Alcove',
    icon: <Icon id="icon-bi_grid_3x3" className={css.icon} size="32px" />,
  },
];

// Компонент для чекбоксів
const IconCheckbox = ({ field, icon }) => {
  const { id, label, icon: IconComponent } = icon;

  return (
    <div
      className={`${css.checkboxButton} ${
        field.value.includes(id) ? css.active : ''
      }`}
      onClick={() => {
        const newValue = field.value.includes(id)
          ? field.value.filter(f => f !== id)
          : [...field.value, id];
        field.onChange({ target: { name: field.name, value: newValue } });
      }}
    >
      {IconComponent}
      <span className={css.checkboxLabel}>{label}</span>
    </div>
  );
};

// Компонент для радіокнопок
const IconRadio = ({ field, icon }) => {
  const { id, label, icon: IconComponent } = icon;

  return (
    <div
      className={`${css.radioButton} ${field.value === id ? css.active : ''}`}
      onClick={() => {
        field.onChange({ target: { name: field.name, value: id } });
      }}
    >
      {IconComponent}
      <span className={css.radioLabel}>{label}</span>
    </div>
  );
};

const IconsForm = () => {
  return (
    <Formik
      initialValues={{
        icons: [],
        vehicleType: '',
        location: '',
      }}
      onSubmit={values => console.log('Form values:', values)}
    >
      {({ handleSubmit }) => (
        <Form className={css.form_container} onSubmit={handleSubmit}>
          <div className={css.location_container}>
            <h3 className={css.title_location}>Location</h3>
            <div className={css.input_container}>
              <Field
                name="location"
                className={css.input}
                placeholder="Kyiv, Ukraine"
              ></Field>
              <Icon id="icon-map" className={css.icon_map} size="20px" />
            </div>
          </div>
          <h3 className={css.filters_title}>Filters</h3>
          <h3 className={css.title}>Vehicle Equipment</h3>
          <div className={css.container}>
            {icons.map(icon => (
              <Field
                key={icon.id}
                name="icons"
                icon={icon}
                component={IconCheckbox}
              />
            ))}
          </div>

          <h3 className={css.title}>Vehicle Type</h3>
          <div className={css.container}>
            {vehicleTypes.map(type => (
              <Field
                key={type.id}
                name="vehicleType"
                icon={type}
                component={IconRadio}
              />
            ))}
          </div>

          <button type="submit" className={css.submit_button}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default IconsForm;
