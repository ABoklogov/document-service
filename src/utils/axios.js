import axios from 'axios';
import { baseUrl } from '../services/urls';

const axiosInstans = axios.create({
  baseURL: `${baseUrl}/data`
});

export default axiosInstans;