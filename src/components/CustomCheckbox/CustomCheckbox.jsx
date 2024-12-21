import { Formik, Field, Form } from 'formik';
import css from './CustomCheckbox.module.css';
import sprite from '../../img/icons/sprite.svg';
import { useDispatch } from 'react-redux';
import { getCampers, setFilters } from '../../redux/campers/operations.js';
import { useEffect } from 'react';
import { selectFilters } from '../../redux/campers/selectors.js';
import { clearCampers, setPage } from '../../redux/campers/slice.js';

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

const filterOptions = [
  {
    id: 'AC',
    label: 'AC',
    icon: <Icon id="icon-wind" className={css.icon} size="32px" />,
  },
  {
    id: 'transmission',
    label: 'Automatic',
    value: 'automatic',
    icon: <Icon id="icon-diagram" className={css.icon} size="32px" />,
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: <Icon id="icon-cup" className={css.icon} size="32px" />,
  },
  {
    id: 'TV',
    label: 'TV',
    icon: <Icon id="icon-tv" className={css.icon} size="32px" />,
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: <Icon id="icon-shower" className={css.icon} size="32px" />,
  },
];

const form = [
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
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        filters: [], // Масив чекбоксів
        form: '', // Тип транспортного засобу
        location: '', // Локація
      }}
      onSubmit={values => {
        const filters = {};

        // Перевірка на валідність локації перед додаванням у фільтри
        if (values.location && values.location !== 'н') {
          filters['location'] = values.location;
        }
        if (values.form) filters['form'] = values.form;

        // Додаємо інші фільтри, якщо вони вибрані
        values.filters.forEach(filter => {
          if (filter === 'AC') filters['AC'] = true;
          if (filter === 'transmission') filters['transmission'] = 'automatic';
          if (filter === 'kitchen') filters['kitchen'] = true;
          if (filter === 'TV') filters['TV'] = true;
          if (filter === 'bathroom') filters['bathroom'] = true;
        });

        // Форматування об'єкта `filters` для використання в запиті
        const formattedFilters = Object.entries(filters).reduce(
          (acc, [key, value]) => {
            acc[`filters[${key}]`] = value;
            return acc;
          },
          {}
        );

        // Очищення items перед запитом
        dispatch(clearCampers());
        dispatch(setPage(1));
        // Записуємо фільтри в Redux стейт
        dispatch(setFilters(filters));

        // Запит на сервер із правильним форматом параметрів
        dispatch(getCampers(formattedFilters));
      }}
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
              />
              <Icon id="icon-map" className={css.icon_map} size="20px" />
            </div>
          </div>

          <h3 className={css.filters_title}>Filters</h3>
          <h3 className={css.title}>Vehicle Equipment</h3>
          <div className={css.container}>
            {filterOptions.map(option => (
              <Field
                key={option.id}
                name="filters"
                icon={option}
                component={IconCheckbox}
              />
            ))}
          </div>

          <h3 className={css.title}>Vehicle Type</h3>
          <div className={css.container}>
            {form.map(type => (
              <Field
                key={type.id}
                name="form"
                icon={type}
                component={IconRadio}
              />
            ))}
          </div>

          <button type="submit" className={css.submit_button}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default IconsForm;
