import { useState, useEffect } from 'react';
import { GlobalStyles } from 'GlobalStyles.styled';
import { Wrapper } from './Wrapper/Wrapper.styled';
import { fetchPhotos } from 'photoAPI/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Error } from 'utils/Error';

import { Notify } from 'notiflix';
import { animateScroll as scroll } from 'react-scroll';
import { nanoid } from 'nanoid';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requiredID, setRequiredID] = useState(null);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    setIsLoading(true);
    fetchPhotos(searchValue, page)
      .then(({ total, totalHits, hits }) => {
        if (!hits.length) {
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }

        if (page === 1) {
          Notify.success(`Hooray! We found ${totalHits} images.`);
        }

        setImages(prevState => [...prevState, ...hits]);
        setShowButton(page < Math.ceil(total / 12));

        if (hits.length < 12 && page !== 1) {
          Notify.failure("You've reached the end of search results");
        }
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [searchValue, page, requiredID]);

  const handleSubmit = newValue => {
    setSearchValue(newValue);
    setRequiredID(nanoid());
    setPage(1);
    setImages([]);
    setShowButton(false);
    setError(null);
  };

  const handleLoadMore = () => {
    scroll.scrollMore(400);
    setPage(prevState => prevState + 1);
  };

  return (
    <Wrapper>
      <GlobalStyles />
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {showButton && <ButtonLoadMore onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {error && <Error message={error} />}
    </Wrapper>
  );
};
