import {request} from './request';

export const dependenceAPI = {
  getDependence: (domainName: string) => {
    return request({
      url: 'http://47.105.158.15:8000/dependences/',
      params: {
        domainName,
      },
      method: 'GET',
    });
  }
};
