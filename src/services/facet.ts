import {request} from './request';

export const facetAPI = {
  getFacetNameAndParentFacetNameByFacetId: (facetId: number) => {
    return request({
      url: 'http://yotta.xjtushilei.com:8083/facet/getFacetNameAndParentFacetNameByFacetId',
      params: {
        facetId,
      },
      method: 'GET',
    });
  }
};
