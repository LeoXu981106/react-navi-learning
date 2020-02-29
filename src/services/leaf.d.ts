import {AxiosError} from 'axios';
declare interface AssembleAPI {
  getAssemblesByFacetId: AxiosError | {
    "assembleId": number;
    "assembleContent": string;
    "assembleText": string;
    "assembleScratchTime": string;
    "facetId": number;
    "sourceId": number;
    "domainId": number;
    "url": null | string;
    "type": "text" | "video";
  }[],
}

declare const assembleAPI: AssembleAPI;
