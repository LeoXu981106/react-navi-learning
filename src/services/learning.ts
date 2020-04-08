import {request} from './request';

export const learningAPI = {
  getPath: (topicId: number) => {
    return request({
      url: '/api/getPath',
      params: {
        topicId,
      },
      method: 'GET',
    });
  }
};
