import {AxiosError} from 'axios';
declare interface FacetAPI {
  getFacetNameAndParentFacetNameByFacetId: AxiosError | {
    "parentFacetId": number | null;
    "facetName": string;
    "parentFacetName": string | null;
  },
}

declare const facetAPI: FacetAPI;
