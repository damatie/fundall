import { getBaseUrl } from 'app/shared/getBaseUrl';
import Axios from 'axios';

// const urls = {
//   test: 'http://cbit-ecommerce.herokuapp.com/api/v1/',
//   development: 'http://cbit-ecommerce.herokuapp.com/api/v1/',
//   production: 'http://cbit-ecommerce.herokuapp.com/api/v1/',
// };
const api = Axios.create({
  baseURL: getBaseUrl(),
});

export default api;
