const ROUTE = {
  REGISTER: '/register',
  ACTIVATE_ACCOUNT: '/activate',
  LOGIN: '/login',
  ADD_POT: '/ollas/save',
  VIEW_ALL_POTS: '/ollas',
  ADD_DONATION: '/donations/save',
  VIEW_DONATIONS: '/donations',
}

const URL = 'http://127.0.0.1:8000/api';

const generateUrl = (route) => `${URL}${route}`;

export { ROUTE, generateUrl };
