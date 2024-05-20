
import Axios from 'axios';
import { actions } from '../provider/reducer/actions';


const handleApiError = (error, dispatch) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized error. Redirect to login page or perform other actions.');
    } else {
      console.error('Error fetching data:', error.message);
    }
  
    dispatch({
      type: actions.logout
    });
  };
  
const api = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Accept': 'application/json'
    }
  });
  
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
  
api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        console.log('Ошибка ', error.response.status, ': ', error.response);
      }
      return Promise.reject(error);
    }
);
  

  
export * from './endpoints'
  
export {
    api,
    handleApiError,
};

export {
    getToken,
} from './routes/authenticate';
  