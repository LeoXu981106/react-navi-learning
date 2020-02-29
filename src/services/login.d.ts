import {AxiosError} from 'axios';
declare interface LoginAPI {
  getToken: AxiosError | {
    token: string;
    publicSecret: string;
  },
  signUp: AxiosError | string,
  signIn: AxiosError | string
}

declare const loginAPI: LoginAPI;
