import PropTypes from 'prop-types';

import { StyledImageError } from './Error.styled';

export const Error = ({ message }) => {
  return <StyledImageError> {message} </StyledImageError>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};