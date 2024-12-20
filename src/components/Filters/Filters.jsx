import css from './Filters.module.css';
import { Formik, Field, Form } from 'formik';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox.jsx';

const Filters = () => {
  return (
    <>
      <div className={css.filters_container}>
        <CustomCheckbox />
      </div>
    </>
  );
};

export default Filters;
