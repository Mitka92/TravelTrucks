import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Імпортуємо useParams
import CamperDetails from '../../components/CamperDetails/CamperDetails.jsx';
import { getCamperById } from '../../redux/campers/operations.js';

const CamperDetailsPage = () => {
  const { id } = useParams(); // Отримуємо id з URL
  const dispatch = useDispatch();

  const { loading, error, currentCamper } = useSelector(state => state.campers); // Дістаємо стан з Redux

  useEffect(() => {
    if (id) {
      dispatch(getCamperById(id)); // Викликаємо операцію для отримання даних
    }
  }, [dispatch, id]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {currentCamper && <CamperDetails />}
    </>
  );
};

export default CamperDetailsPage;
