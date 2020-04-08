import { dependenceAPI } from '../../../services/dependence';
import { learningAPI } from '../../../services/learning';

export default {
  namespace: 'learning',
  state: {
    topics: {},
    topicsTree: [],
    learningMethod: 'global',
    learningPath: [],
    learningTopicsTree: [],
  },
  reducers: {
    updateTopics(state, {payload: {topics}}) {
      return { ...state, topics };
    },
    updateTopicsTree(state, {payload: {topicsTree}}) {
      return { ...state, topicsTree};
    },
    updateLearningMethod(state, {payload: {learningMethod}}) {
      return { ...state, learningMethod };
    },
    updateLearningPath(state, {payload: {learningPath}}) {
      return {...state, learningPath};
    },
    updateLearningTopicsTree(state, {payload: {learningTopicsTree}}) {
      return {...state, learningTopicsTree};
    },
  },
  effects: {
    *getDependence({payload: {domainName}}, {put, call}) {
      try {
        yield call(dependenceAPI.getDependence, domainName);
      } catch (e) {
        const res = e;
        yield put({
          type: 'updateTopics',
          payload: {
            topics: res.topics,
          },
        });
        const graph = res.graph;
        const topicsTree = [];
        for (const com in graph) {
          const comTopics = {};
          let maxLen = -1;
          let representNode = '';
          let representId = -1;
          for (const startTopic in graph[com]) {
            if (graph[com][startTopic].length > maxLen) {
              maxLen = graph[com][startTopic].length;
              representNode = res.topics[startTopic];
              representId = parseInt(startTopic);
            }
            if (!comTopics[startTopic] && parseInt(startTopic) !== -1) {
              comTopics[startTopic] = res.topics[startTopic];
            }
            for (const endTopic of graph[com][startTopic]) {
              if (!comTopics[endTopic] && parseInt(endTopic) !== -1) {
                comTopics[endTopic] = res.topics[endTopic];
              }
            }
          }
          topicsTree.push({
            topicId: representId,
            topicName: representNode,
            children: Object.keys(comTopics).map(topicId => ({
              topicId: parseInt(topicId),
              topicName: res.topics[topicId],
            }))
          });
        }
        yield put({
          type: 'updateTopicsTree',
          payload: {
            topicsTree,
          }
        });
      }
    },
    *getPath({payload: {topicId}}, {put, call, select}) {
      try {
        const path = yield call(learningAPI.getPath, topicId);
        yield put({
          type: 'updateLearningPath',
          payload: {
            learningPath: path,
          },
        });
        const topicsTree = yield select(state => state.learning.topicsTree);
        let result = [];
        for (let com of topicsTree) {
          let tmp = com.children.slice().sort((a,b) => {
            let indexA = path.indexOf(a.topicId) === -1 ? Infinity : path.indexOf(a.topicId);
            let indexB = path.indexOf(b.topicId) === -1 ? Infinity : path.indexOf(b.topicId);
            return indexA - indexB;
          })
          result.push({
            topicId: com.topicId,
            topicName: com.topicName,
            children: tmp,
            index: (tmp.length > 0 && path.indexOf(tmp[0].topicId) !== -1) ? path.indexOf(tmp[0].topicId) : Infinity,
          });
        }
        result.sort((a,b) => a.index - b.index);
        yield put({
          type: 'updateLearningTopicsTree',
          payload: {
            learningTopicsTree: result,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  subscriptions: {},
}
