import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34278374-42985d32b27cb2abd29a7b240';

axios.defaults.params = {
  per_page: 12,
};

export const fetchPhotos = async (searchValue, page) => {
  const { data } = await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&page=${page}`);
  return data;
}
