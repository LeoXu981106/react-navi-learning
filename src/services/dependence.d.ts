import {AxiosError} from 'axios';
declare interface DependenceAPI {
  getDependence: AxiosError | {
    topics: {
      [p: number]: string;
    };
    resultRelations: {
      [p: number]: number[];
    };
    graph: {
      [p: number]: {
        [p:number]: number[];
      }
    };
    topicId2Community: {
      [p: number]: number;
    };
    relationCrossCommunity: [number, number][];
    communityRelation: {
      [p: number]: number[];
    }
  };
}

declare const dependenceAPI: DependenceAPI;
