import css from './Loader.module.css';
const Loader = () => {
  return (
    <div className={css.container}>
      <p className={css.text}>Loading...</p>
    </div>
  );
};

export default Loader;
