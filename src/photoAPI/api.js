const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34278374-42985d32b27cb2abd29a7b240';

export const fetchPhotos = (searchValue, page = 1, perPage = 12) => {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`
The ${searchValue} was not found. Try again later.`)
    );
  });
};
