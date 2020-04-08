import {AxiosError} from 'axios';
declare interface LearningAPI {
  getPath: AxiosError | number[];
}

declare const learningAPI: LearningAPI;
