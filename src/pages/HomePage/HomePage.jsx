import React from 'react';
import css from './HomePage.module.css';
import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <>
      <div className={css.hero}>
        <div className={css.title}>
          <h1 className={css.title_main_text}>Campers of your dreams</h1>
          <h2 className={css.title_text}>
            You can find everything you want in our catalog
          </h2>
          <Link to="/catalog">
            <button className={css.title_button}>View Now</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
