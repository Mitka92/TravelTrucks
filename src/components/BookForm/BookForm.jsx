import css from './BookForm.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../Button/Button.jsx';
const BookForm = () => {
  // Схема валідації за допомогою Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    booking: Yup.string().required('Booking date is required'),
    comment: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Показуємо повідомлення про успішний сабміт
    toast.success('Form submitted successfully!');

    // Скидаємо форму
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        booking: '',
        comment: '', // Додано поле для коментаря
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit} // Використовуємо onSubmit на рівні форми
    >
      {() => (
        <Form className={css.form}>
          <div className={css.form_title_container}>
            <h3 className={css.form_title}>Book your campervan now</h3>
            <p className={css.form_text}>
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <div className={css.formGroup}>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Name*"
              className={css.input}
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>
          <div className={css.formGroup}>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Email*"
              className={css.input}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>
          <div className={css.formGroup}>
            <Field
              id="booking"
              name="booking"
              type="text"
              placeholder="Booking date*"
              className={css.input}
            />
            <ErrorMessage
              name="booking"
              component="div"
              className={css.error}
            />
          </div>
          <div className={css.formGroup}>
            <Field
              id="comment"
              name="comment"
              as="textarea" // Замінили на textarea
              placeholder="Comment"
              className={css.textarea}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={css.error}
            />
          </div>
          <Button text="Send" className={css.submitButton} />
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
