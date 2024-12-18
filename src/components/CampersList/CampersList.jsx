import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCampers,
  selectCampersError,
  selectIsLoading,
} from '../../redux/campers/selectors.js';
import CampersListItem from '../CampersListItem/CampersListItem.jsx';
import css from './CampersList.module.css';
const CampersList = () => {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectCampersError);

  return (
    <>
      {campers.length > 0 && (
        <div className={css.campers_list_container}>
          <ul className={css.campers_list}>
            {campers.map(camper => (
              <CampersListItem
                key={camper.id} // Унікальний ключ
                {...camper} // Передаємо всі властивості camper як пропси
              />
            ))}
          </ul>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default CampersList;
