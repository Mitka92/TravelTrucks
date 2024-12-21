import { useState } from 'react';
import { useSelector } from 'react-redux';
import MoreInfo from '../MoreInfo/MoreInfo.jsx';
import css from './CamperDetails.module.css';
import sprite from '../../img/icons/sprite.svg';
import { selectCurrentCamper } from '../../redux/campers/selectors.js';
import BookForm from '../BookForm/BookForm.jsx';

const Icon = ({ id, fill, size, className, stroke, ...props }) => (
  <svg
    className={`${css.icon} ${className || ''}`.trim()}
    width={size}
    height={size}
    {...props}
  >
    <use xlinkHref={`${sprite}#${id}`} style={{ fill: fill, stroke: stroke }} />
  </svg>
);
const CamperDetails = () => {
  const camper = useSelector(selectCurrentCamper);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  if (!camper) {
    return <p>Loading...</p>; // Або інший індикатор завантаження
  }

  const { name, location, rating, price, reviews, gallery, description } =
    camper;

  const openModal = image => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  // Закриття на клавішу Esc
  const handleKeyDown = e => {
    if (e.key === 'Escape') closeModal();
  };

  return (
    <div
      className={css.container}
      onKeyDown={isModalOpen ? handleKeyDown : null}
      tabIndex={-1}
    >
      <div className={css.info_box}>
        <h2 className={css.name}>{name}</h2>
        <div className={css.thumb_2}>
          <Icon
            id="icon-star"
            className={css.rating_icon}
            stroke="none"
            fill="#FFC531"
            size="16px"
          />
          <p className={css.rating}>
            {rating} ({reviews.length} Reviews)
          </p>
          <Icon
            className={css.rating_icon}
            id="icon-map"
            stroke="none"
            fill="inherit"
            size="16px"
          />
          <p className={css.location}>{location}</p>
        </div>
        <span>
          <p className={css.price}>&#x20AC;{price}.00</p>
        </span>
      </div>
      <div className={css.gallery_box}>
        <ul className={css.gallery}>
          {gallery.map((img, index) => (
            <li
              className={css.item}
              key={index}
              onClick={() => openModal(img.original)}
            >
              <img
                className={css.image}
                width="292px"
                height="312px"
                src={img.thumb}
                alt={`${name} - ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <p className={css.description}>{description}</p>
      <MoreInfo />

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className={css.backdrop} onClick={handleBackdropClick}>
          <div className={css.modal}>
            <button className={css.closeButton} onClick={closeModal}>
              &times;
            </button>
            <img
              src={modalImage}
              alt="Enlarged View"
              className={css.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CamperDetails;
