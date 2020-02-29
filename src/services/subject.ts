import {request} from './request';

export const subjectAPI = {
  getSubjects: (token: string) => {
    return request({
      url: 'http://127.0.0.1:4000/getSubjects',
      headers: { authorization: token},
    })
  },
  getDomains: (subjectName: string) => {
    return request({
      url: 'http://yotta.xjtushilei.com:8083/domain/getDomainsBySubject',
      params: {
        subjectName,
      },
      method: 'GET',
    });
  }
};
