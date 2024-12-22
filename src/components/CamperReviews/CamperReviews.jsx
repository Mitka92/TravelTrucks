import { selectCurrentCamper } from '../../redux/campers/selectors.js';
import Icon from '../Icon/Icon.jsx';
import css from './CamperReviews.module.css';
import { useSelector } from 'react-redux';

const CamperReviews = () => {
  const camper = useSelector(selectCurrentCamper);
  const reviews = camper?.reviews || []; // Перевіряємо наявність reviews

  const renderStars = (rating, reviewId) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <Icon
            key={`${reviewId}-${i}`}
            id="icon-star"
            size="16px"
            className={css.yellow_star}
          />
        ) : (
          <Icon
            key={`${reviewId}-${i}`}
            id="icon-star"
            size="16px"
            className={css.gray_star}
          />
        )
      );
    }
    return stars;
  };

  return (
    <div className={css.container}>
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map((review, index) => (
            <li key={index} className={css.item}>
              <div className={css.title_container}>
                <div className={css.logo_container}>
                  <div className={css.logo}>
                    <span className={css.letter}>
                      {review.reviewer_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className={css.rating}>
                  <h4 className={css.name}>{review.reviewer_name}</h4>
                  <div className={css.stars}>
                    {renderStars(review.reviewer_rating, index)}
                  </div>
                </div>
              </div>
              <p className={css.text}>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.no_reviews}>No reviews available</p>
      )}
    </div>
  );
};

export default CamperReviews;
