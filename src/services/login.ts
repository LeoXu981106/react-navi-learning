import {request} from './request';

export const loginAPI = {
  getToken: () => {
    return request({
      url: 'http://127.0.0.1:4000/getToken'
    });
  },
  signUp: (token: string, data: string) => {
    return request({
      url: 'http://127.0.0.1:4000/signUp',
      headers: { authorization: token},
      data: {
        data
      },
    })
  },
  signIn: (token: string, data: string) => {
    return request({
      url: 'http://127.0.0.1:4000/signIn',
      headers: { authorization: token},
      data: {
        data
      },
    })
  }
};
