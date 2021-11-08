const ROUTE = {
  REGISTER: '/register',
  ACTIVATE_ACCOUNT: '/activate',
  LOGIN: '/login',
  LOG_OUT: '/logout',
  ADD_POT: '/pots/save',
  VIEW_ALL_POTS: '/ollas',
  ADD_DONATION: '/donations/save',
  VIEW_DONATIONS: '/donations',
};

let URL;

if (window.location.hostname === 'localhost') {
  URL = 'http://127.0.0.1:8000/api';
} else {
  URL = process.env.REACT_APP_API_URL;
}

const generateUrl = (route) => `${URL}${route}`;

export { ROUTE, generateUrl };
