import axios from 'axios';
import TYPE from './requestTypes';

import { ROUTE, generateUrl } from './routes';

const METHOD = {
  POST: 'POST',
  GET: 'GET',
};

const sendRequest = async (url, method, body) => {
  try {
    const response = await axios({
      method,
      url,
      data: body,
    });

    return response;
  } catch (error) {
    return error;
  };
};

const fetchController = async (type, data) => {
  switch (type) {
    case TYPE.REGISTER:
      let registerResponse;
      const registerUrl = generateUrl(ROUTE.REGISTER);

      try {
        registerResponse = await sendRequest(registerUrl, METHOD.POST,
          {
            email: data.email,
            name: data.name,
            surname: data.surname,
            passwd: data.password,
          });

        return registerResponse;
      } catch (error) {
        return error;
      }

    case TYPE.LOGIN:

      break;
    case TYPE.ADD_POT:

      break;
    case TYPE.VIEW_ALL_POTS:

      break;
    case TYPE.ADD_DONATION:

      break;
    case TYPE.ACTIVATE_ACCOUNT:
      const activateUrl = generateUrl(ROUTE.ACTIVATE_ACCOUNT);

      try {
        const activateResponse = await sendRequest(activateUrl, METHOD.POST, {
          email: data.email,
          token: data.token,
        });

        return activateResponse;
      } catch (error) {
        return error;
      }

    default:
      break;
  };
};

export default fetchController;