import {AxiosError} from 'axios';
declare interface SubjectAPI {
  getSubjects: AxiosError | {
    subject_id: number;
    subject_name: string;
    description: string;
    id: number;
  }[],
  getDomains: AxiosError | {
    "domainId": number;
    "domainName": string;
    "subjectId": number;
  }[],
}

declare const subjectAPI: SubjectAPI;
