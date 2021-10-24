const BASE_URL = "https://pixabay.com/api/";
const UNIQUE_KEY = "23035178-c9501c24659a46c37914a5a12";

export default function fetchImages(searchQuery, page) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${UNIQUE_KEY}`
  ).then((r) => r.json());
}
