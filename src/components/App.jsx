import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    images: [],
    showBtn: false,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ isLoading: true });

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

          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showBtn: page < Math.ceil(total / 12),
          }));

          if (hits.length < 12 && page !== 1) {
            Notify.failure(
              "We're sorry, but you've reached the end of search results"
            );
          }
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(this.setState({ isLoading: false }));
    }
  }

  handleSubmit = searchValue => {
    this.setState({
      searchValue,
      page: 1,
      images: [],
      showBtn: false,
      error: null,
    });
  };

  handleClickMore = () => {
    scroll.scrollMore(400);
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, showBtn, isLoading, error } = this.state;
    return (
      <Wrapper>
        <GlobalStyles />
        <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery images={images} />
            {showBtn && (
              <ButtonLoadMore onClick={this.handleClickMore} />
            )}
          {isLoading && <Loader />}
        {error && < Error message={error} />}
      </Wrapper>
      
    );
  }
}
