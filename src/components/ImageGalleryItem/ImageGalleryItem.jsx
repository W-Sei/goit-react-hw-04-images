import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

import { ImageItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <ImageItem>
        <Image onClick={toggleModal} src={webformatURL} alt={tags} />
      </ImageItem>

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
