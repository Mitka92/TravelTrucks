import css from './Filters.module.css';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getCampers, setFilters } from '../../redux/campers/operations.js';
import { clearCampers, setPage } from '../../redux/campers/slice.js';
import Icon from '../Icon/Icon.jsx';
import Button from '../Button/Button.jsx';
import Select from 'react-select';
import { components } from 'react-select';
import { selectUniqueLocations } from '../../redux/campers/selectors.js';

// Кастомний компонент Placeholder
const CustomPlaceholder = props => {
  return (
    <components.Placeholder {...props}>
      <span style={{ color: '#aaa', fontSize: '14px' }}>{props.children}</span>
    </components.Placeholder>
  );
};

// Налаштування стилів для Placeholder
const customStyles = {
  control: provided => ({
    ...provided,
    width: '100%',
    paddingLeft: '40px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: '#333',
    boxSizing: 'border-box',
    cursor: 'pointer',
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: '14px',
  }),
  option: provided => ({
    ...provided,
    fontSize: '14px',
    cursor: 'pointer',
  }),
};

const filterOptions = [
  {
    id: 'AC',
    label: 'AC',
    icon: <Icon className={css.icon} id="icon-wind" size="32px" />,
  },
  {
    id: 'transmission',
    label: 'Automatic',
    value: 'automatic',
    icon: <Icon className={css.icon} id="icon-diagram" size="32px" />,
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: <Icon className={css.icon} id="icon-cup" size="32px" />,
  },
  {
    id: 'TV',
    label: 'TV',
    icon: <Icon className={css.icon} id="icon-tv" size="32px" />,
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: <Icon className={css.icon} id="icon-shower" size="32px" />,
  },
];

const form = [
  {
    id: 'panelTruck',
    label: 'Van',
    icon: <Icon className={css.icon} id="icon-bi_grid_1x2" size="32px" />,
  },
  {
    id: 'fullyIntegrated',
    label: 'Fully Integrated',
    icon: <Icon className={css.icon} id="icon-bi_grid" size="32px" />,
  },
  {
    id: 'alcove',
    label: 'Alcove',
    icon: <Icon className={css.icon} id="icon-bi_grid_3x3" size="32px" />,
  },
];

// Компонент для чекбоксів
const checkbox = ({ field, icon }) => {
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
const radio = ({ field, icon }) => {
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

const Filters = () => {
  const locations = useSelector(selectUniqueLocations);
  const locationOptions = locations.map(location => {
    const [country, city] = location.split(', ');
    return {
      value: `${country}, ${city}`,
      label: `${country}, ${city}`,
    };
  });

  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        filters: [], // Масив чекбоксів
        form: null, // Тип транспортного засобу
        location: null, // Локація
      }}
      onSubmit={values => {
        const filters = {};

        // Перевірка на валідність локації перед додаванням у фільтри
        if (values.location && values.location !== '') {
          filters['location'] = values.location.value;
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
        console.log(filters);
        dispatch(setFilters(filters));

        // Запит на сервер із правильним форматом параметрів
        dispatch(getCampers(formattedFilters));
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <Form className={css.form_container} onSubmit={handleSubmit}>
          <div className={css.location_container}>
            <h3 className={css.title_location}>Location</h3>
            <div className={css.input_container}>
              <Icon id="icon-map" className={css.icon_map} size="20px" />
              <div className={css.input}>
                <Select
                  name="location"
                  options={locationOptions}
                  className={css.select}
                  classNamePrefix="select"
                  styles={customStyles}
                  placeholder="Select location"
                  components={{ Placeholder: CustomPlaceholder }} // використовується кастомний Placeholder
                  value={values.location}
                  onChange={option => setFieldValue('location', option)}
                  isClearable
                />
              </div>
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
                component={checkbox}
              />
            ))}
          </div>

          <h3 className={css.title}>Vehicle Type</h3>
          <div className={css.container}>
            {form.map(type => (
              <Field key={type.id} name="form" icon={type} component={radio} />
            ))}
          </div>
          <Button type="submit" text="Search" className={css.submit_button} />
        </Form>
      )}
    </Formik>
  );
};

export default Filters;
