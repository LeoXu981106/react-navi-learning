import { subjectAPI } from '../../../services/subject';
import { router } from 'umi';

export default {
  namespace: 'home',
  state: {
    subjects: [],
    currentSubjectName: '',
    domains: [],
  },
  effects: {
    *getSubjects(action, {call, select, put}) {
      const authToken = yield select(state => state.userData.authToken);
      try {
        const res = yield call(subjectAPI.getSubjects, authToken);
        yield put({
          type: 'updateSubjects',
          payload: {
            subjects: res,
          },
        });
      } catch (e) {
        if (e.code === 401) {
          router.push('/login');
        }
        console.log(e);
      }
    },
    *getDomains({payload: {currentSubjectName}}, {call, put}) {
      try {
        const domains = yield call(subjectAPI.getDomains, currentSubjectName);
        yield put({
          type: 'updateDomains',
          payload: {
            domains,
          }
        })
      } catch (e) {

      }
    },
  },
  reducers: {
    updateSubjects(state, {payload: {subjects}}) {
      return { ...state, subjects};
    },
    updateCurrentSubjectName(state, {payload: {currentSubjectName}}) {
      return { ...state, currentSubjectName };
    },
    updateDomains(state, {payload: {domains}}) {
      return { ...state, domains };
    }
  },
  subscriptions: {},
}
