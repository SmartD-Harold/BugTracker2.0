import axios, { AxiosResponse } from 'axios';

import { camelizeKeys, decamelizeKeys } from 'humps';
import { ConfigurationConfig } from '../../../config/configuration.config';

const config = ConfigurationConfig();

const apiMantisbt = axios.create({
  baseURL: config.mantisbt.api.url,
  // headers: {
  //   Authorization: 'HLCIlu-zR4wBKU1L91xu94xRBN9WOSb2',
  //   'Content-Type': 'application/json',
  // },
});

// Axios middleware to convert all api responses to camelCase
apiMantisbt.interceptors.response.use((response: AxiosResponse) => {
  if (
    response.data &&
    response.headers['content-type'] === 'application/json'
  ) {
    response.data = camelizeKeys(response.data);
  }

  return response;
});

// Axios middleware to convert all api requests to snake_case
apiMantisbt.interceptors.request.use((config: any) => {
  const newConfig = { ...config };
  newConfig.url = `${config.url}`;

  if (newConfig.headers['Content-Type'] === 'multipart/form-data')
    return newConfig;

  if (config.params) {
    newConfig.params = decamelizeKeys(config.params);
  }

  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }

  return newConfig;
});

export default apiMantisbt;
