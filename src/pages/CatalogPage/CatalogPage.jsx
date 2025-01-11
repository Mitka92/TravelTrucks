import { useEffect } from 'react';
import CampersList from '../../components/CampersList/CampersList.jsx';
import Filters from '../../components/Filters/Filters.jsx';
import css from './CatalogPage.module.css';
import { useDispatch } from 'react-redux';
import { clearCampers, resetPage } from '../../redux/campers/slice.js';
import { getCampers } from '../../redux/campers/operations.js';

const CatalogPage = () => {
  const dispatch = useDispatch();
  dispatch(resetPage());
  dispatch(clearCampers());
  dispatch(getCampers());
  return (
    <div className={css.catalog_container}>
      <Filters />
      <CampersList />
    </div>
  );
};

export default CatalogPage;
