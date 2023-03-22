import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearchValue(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchValue.trim() === '') {
      return Notify.info('Please, fill in the search field!');
    }
    onSubmit(searchValue);
    reset();
  };

  const reset = () => {
    setSearchValue('');
  };

  return (
    <SearchbarHeader onSubmit={handleSubmit}>
      <SearchForm>
        <SearchFormButton type="submit">
          <GoSearch />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
