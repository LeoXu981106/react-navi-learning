import { facetAPI } from '../services/facet';
import { assembleAPI } from '../services/leaf';

export default {
  namespace: 'globalData',
  state: {
    currentDomainName: '',
    currentTopicName: '',
    currentFirstFacetName: '',
    currentSecondFacetName: '',
    currentFacetId: '',
    assembles: [],
  },
  reducers: {
    updateCurrentDomainName(state, {payload: {currentDomainName}}) {
      return { ...state, currentDomainName};
    },
    updateCurrentTopicName(state, {payload: {currentTopicName}}) {
      return {...state, currentTopicName, currentFirstFacetName: '', currentSecondFacetName: ''};
    },
    updateCurrentFacetName(state, {payload: {currentFirstFacetName, currentSecondFacetName, currentFacetId}}) {
      return {...state, currentFirstFacetName, currentSecondFacetName, currentFacetId};
    },
    updateAssembles(state, {payload: {assembles}}) {
      return {...state, assembles};
    }
  },
  effects: {
    *getFacetNamesByFacetId({payload: {facetId}}, {put, call}) {
      try {
        const {facetName, parentFacetName} = yield call(facetAPI.getFacetNameAndParentFacetNameByFacetId, facetId);
        if (parentFacetName) {
          yield put({
            type: 'updateCurrentFacetName',
            payload: {
              currentFirstFacetName: parentFacetName,
              currentSecondFacetName: facetName,
              currentFacetId: facetId,
            },
          });
        } else {
          yield put({
            type: 'updateCurrentFacetName',
            payload: {
              currentFirstFacetName: facetName,
              currentSecondFacetName: '',
              currentFacetId: facetId,
            },
          });
        }
        yield put({
          type: 'getAssembles',
          payload: {
            facetId,
          }
        })
      } catch (e) {
      }
    },
    *getAssembles({payload: {facetId}}, {put, call}) {
      try {
        const assembles = yield call(assembleAPI.getAssemblesByFacetId, facetId);
        yield put({
          type: 'updateAssembles',
          payload: {
            assembles,
          },
        });
      } catch (e) {

      }
    }
  },
  subscriptions: {},
}
