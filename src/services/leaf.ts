import {request} from './request';

export const assembleAPI = {
  getAssemblesByFacetId: (facetId: number) => {
    return request({
      url: 'http://yotta.xjtushilei.com:8083/assemble/getAssemblesByFacetId',
      params: {
        facetId,
      },
      method: 'GET',
    });
  }
};
