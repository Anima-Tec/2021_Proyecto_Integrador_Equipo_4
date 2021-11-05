import axios from 'axios';

import TYPE from './requestTypes';
import { ROUTE, generateUrl } from './routes';

const METHOD = {
  POST: 'POST',
  GET: 'GET',
};

const sendRequest = async (url, method, body, extraHeaders) => {
  try {
    const axiosR = await axios({
      method,
      url,
      data: qs.stringify(body),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        ...extraHeaders
      }
    })
    return axiosR;

  } catch (error) {
    return error.response;
  }
};

const fetchController = async (type, data, extraHeaders) => {
  switch (type) {
    case TYPE.REGISTER:
      const registerUrl = generateUrl(ROUTE.REGISTER);

      const registerResponse = await sendRequest(registerUrl, METHOD.POST,
        {
          fullName: `${data.name} ${data.surname}`,
          email: data.email,
          password: data.password,
        });

      return registerResponse;

    case TYPE.LOGIN:
      const loginUrl = generateUrl(ROUTE.LOGIN)

      const loginResponse = await sendRequest(loginUrl, METHOD.POST,
        {
          email: data.email,
          password: data.password,
        });

      return loginResponse;

    case TYPE.ADD_POT:
      const addPotUrl = generateUrl(ROUTE.ADD_POT);
      const addPotResponse = await sendRequest(addPotUrl, METHOD.POST, {
        email: data.email,
        address: data.address,
        name: data.potName,
        desc: data.description,
        latlng: data.latlng,
        image: data.image,
        openFrom: data.from,
        to: data.to, 
      },
      {Authorization: `Bearer ${extraHeaders.token}`}
      );
      return addPotResponse;

    case TYPE.VIEW_ALL_POTS:

      break;
    case TYPE.ADD_DONATION:

      break;
    case TYPE.ACTIVATE_ACCOUNT:
      const activateUrl = generateUrl(ROUTE.ACTIVATE_ACCOUNT);

      const activateResponse = await sendRequest(activateUrl, METHOD.POST, {
        email: data.email,
        token: data.token,
      });

      return activateResponse;

    case TYPE.LOG_OUT:
      const logOutURL = generateUrl(ROUTE.LOG_OUT);

      const logOutResponse = await sendRequest(logOutURL, METHOD.POST, {}, { Authorization: `Bearer ${extraHeaders.token}` });

      return logOutResponse;

    default:
      break;
  };
};

export default fetchController;
