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
      let loginResponse;
      const loginUrl = generateUrl(ROUTE.LOGIN)

      try {
        loginResponse = await sendRequest(loginUrl, METHOD.POST,
          {
            email: data.email,
            passwd: data.password,
          });
        return loginResponse;
      } catch (error) {
        return error
      }

    case TYPE.ADD_POT:
      let addPotResponse;
      const addPotUrl = generateUrl(ROUTE.ADD_POT);
      try {
        addPotResponse = await sendRequest(addPotUrl, METHOD.POST, {
          email: data.email,
          name: data.name,
          description: data.description,
          latitude: data.latitude,
          longitude: data.longitude,
          from: data.from,
          to: data.to,
        });

        return addPotResponse;
      } catch (error) {
        return error;
      }

      //revisar
    case TYPE.VIEW_ALL_POTS:
      let viewPotsResponse;
      const viewPotsUrl = generateUrl(ROUTE.VIEW_ALL_POTS);
      try{
        viewPotsResponse = await sendRequest(viewPotsUrl, METHOD.GET, {
          name: data.name,
          state: data.state,
          description: data.desc,
          from: data.openFrom,
          to: data.to,
        });
        return console.log(viewPotsResponse);
      }
      catch (error) {
        return error;
      }

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
