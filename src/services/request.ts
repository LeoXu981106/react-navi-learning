import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

class Request {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  baseRequest = async (config: AxiosRequestConfig) => {
    try {
      const res: AxiosResponse = await this.axiosInstance.request(config);
      if (res.data.code === 200) {
        return res.data.data;
      }
      throw res.data;
    } catch (e) {
      throw e;
    }
  }
}

const requestInstance = new Request();

export function request(config: AxiosRequestConfig) {
  return requestInstance.baseRequest(config);
}
