import { ButtonLoadMoreSt } from "./Button.styled";
import PropTypes from 'prop-types';

export const ButtonLoadMore = ({ onClick }) => {
    return (
      <ButtonLoadMoreSt type="Button" onClick={onClick}>
        Load More
      </ButtonLoadMoreSt>
    );
};
  
ButtonLoadMoreSt.propTypes = {
  onClick: PropTypes.func,
};
