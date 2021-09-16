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
    console.log(response);
    return response;
  } catch (error) {
    return error;
  };
};

const fetchController = async (type, data) => {
  switch (type) {
    case TYPE.REGISTER:
      let registerResponse;
      const url = generateUrl(ROUTE.REGISTER);

      try {
        registerResponse = await sendRequest(url, METHOD.POST,
          {
            email: data.email,
            name: data.name,
            surname: data.surname,
            passwd: data.password,
          });

        console.log(registerResponse);
      } catch (error) {
        return error;
      }

      return registerResponse;

    case TYPE.LOGIN:

      break;
    case TYPE.ADD_POT:

      break;
    case TYPE.VIEW_ALL_POTS:

      break;
    case TYPE.ADD_DONATION:

      break;

    default:
      break;
  };
};

export default fetchController;
