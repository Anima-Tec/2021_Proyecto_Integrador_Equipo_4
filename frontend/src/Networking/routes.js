const ROUTE = {
  REGISTER: '/register',
  ACTIVATE_ACCOUNT: '/activate',
  LOGIN: '/login',
  ADD_POT: '/pots/save',
  VIEW_ALL_POTS: '/pots',
  VIEW_POTS_IN_NEED: '/potsInNeed',
  VIEW_MY_POTS: '/auth/pots',
  LOG_OUT: '/logout',
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

export { ROUTE, generateUrl};
