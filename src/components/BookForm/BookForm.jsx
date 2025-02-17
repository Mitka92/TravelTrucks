import css from './BookForm.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../Button/Button.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookForm = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    bookingDate: Yup.date()
      .required('Booking date is required')
      .min(today, 'Booking date cannot be in the past'),
    comment: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    toast.success(
      <div>
        Form submitted successfully!
        <br />
        <strong>Name:</strong> {values.name}
        <br />
        <strong>Email:</strong> {values.email}
        <br />
        <strong>Booking date:</strong>{' '}
        {values.bookingDate
          ? values.bookingDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Not selected'}
        <br />
        <strong>Comment:</strong> {values.comment}
      </div>
    );
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        bookingDate: today,
        comment: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => (
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
            <DatePicker
              id="bookingDate"
              className={css.input}
              placeholderText="Select a booking date*"
              selected={values.bookingDate}
              onChange={date => setFieldValue('bookingDate', date)}
              minDate={today}
            />
            {errors.bookingDate && touched.bookingDate && (
              <div className={css.error}>{errors.bookingDate}</div>
            )}
          </div>
          <div className={css.formGroup}>
            <Field
              id="comment"
              name="comment"
              as="textarea"
              placeholder="Comment"
              className={css.textarea}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={css.error}
            />
          </div>
          <Button type="submit" text="Send" className={css.submitButton} />
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
