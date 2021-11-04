const ROUTE = {
  REGISTER: '/register',
  ACTIVATE_ACCOUNT: '/activate',
  LOGIN: '/login',
  ADD_POT: '/pots/save',
  VIEW_ALL_POTS: '/pots',
  VIEW_MY_POTS: '/auth/pots',
  LOG_OUT: '/logout',
  ADD_DONATION: '/donations/save',
  VIEW_DONATIONS: '/donations',
}

const URL = 'http://127.0.0.1:8000/api';

const generateUrl = (route) => `${URL}${route}`;

export { ROUTE, generateUrl};
