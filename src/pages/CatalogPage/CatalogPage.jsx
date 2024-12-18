import { useEffect } from 'react';
import { getCampers } from '../../redux/campers/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import CampersList from '../../components/CampersList/CampersList.jsx';

const CatalogPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCampers());
  }, [dispatch]);
  return <CampersList />;
};

export default CatalogPage;
