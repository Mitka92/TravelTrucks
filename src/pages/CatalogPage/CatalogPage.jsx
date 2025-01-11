import { useEffect } from 'react';
import { getCampers, getLocations } from '../../redux/campers/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import CampersList from '../../components/CampersList/CampersList.jsx';
import Filters from '../../components/Filters/Filters.jsx';
import css from './CatalogPage.module.css';
const CatalogPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocations());
  }, []);
  return (
    <div className={css.catalog_container}>
      <Filters />
      <CampersList />
    </div>
  );
};

export default CatalogPage;
