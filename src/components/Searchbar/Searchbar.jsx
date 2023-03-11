import { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ searchValue: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchValue.trim() === '') {
      return Notify.info('Please, fill in the search field!');
    }
    this.props.onSubmit(this.state.searchValue);
    this.reset();
  };

  reset = () => {
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <SearchbarHeader onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

