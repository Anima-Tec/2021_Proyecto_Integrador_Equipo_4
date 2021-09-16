const ROUTE = {
  REGISTER: '/register',
  LOGIN: '/login',
  ADD_POT: '',
  VIEW_ALL_POTS: '',
  ADD_DONATION: '/donations/save',
  VIEW_DONATIONS: '/donations',
}

const URL = 'http://127.0.0.1:8000/api';

// const generateUrl = (route) => `${process.env.REACT_APP_API_URL}${route}`;
const generateUrl = (route) => `${URL}${route}`;

export { ROUTE, generateUrl };
