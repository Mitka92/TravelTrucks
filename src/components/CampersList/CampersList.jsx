import { useDispatch, useSelector } from 'react-redux';
import {
  selectCampers,
  selectIsLoading,
  selectPage,
  selectTotalCampers,
} from '../../redux/campers/selectors.js';
import CampersListItem from '../CampersListItem/CampersListItem.jsx';
import css from './CampersList.module.css';
import { getCampers } from '../../redux/campers/operations.js';
import { setPage } from '../../redux/campers/slice.js'; // Імпортуємо екшен setPage
import { useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';

const CampersList = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers); // Масив кемперів
  const totalCampers = useSelector(selectTotalCampers); // Загальна кількість кемперів
  const isLoading = useSelector(selectIsLoading);

  const page = useSelector(selectPage);
  const limit = 4; // Кількість елементів на сторінку
  const totalPages = Math.ceil(totalCampers / limit); // Кількість сторінок
  const buttonIsActive = page < totalPages;

  // Отримуємо фільтри з Redux
  const filters = useSelector(state => state.campers.filters);

  // Використовуємо useEffect для завантаження даних після зміни сторінки або фільтрів
  useEffect(() => {
    dispatch(getCampers({ page, limit, filterParams: filters }));
  }, [dispatch, page, filters]); // Залежності: зміна сторінки або фільтрів

  const loadMore = () => {
    if (buttonIsActive) {
      dispatch(setPage(page + 1)); // Збільшуємо сторінку
    }
  };

  return (
    <>
      {
        campers.length > 0 && (
          <div className={css.campers_list_container}>
            <ul className={css.campers_list}>
              {campers.map(camper => (
                <CampersListItem key={camper.id} {...camper} />
              ))}
            </ul>
            {isLoading && <Loader />}
            {buttonIsActive && (
              <button className={css.load_more} onClick={loadMore}>
                Load more
              </button>
            )}
          </div>
        )
        //  : (
        //   <div className={css.campers_list_container}>
        //     <p className={css.no_found}>No campers found</p>
        //   </div>
        // )
      }
    </>
  );
};

export default CampersList;
