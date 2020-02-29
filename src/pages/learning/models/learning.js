import { dependenceAPI } from '../../../services/dependence';

export default {
  namespace: 'learning',
  state: {
    topics: {},
    topicsTree: {},
  },
  reducers: {
    updateTopics(state, {payload: {topics}}) {
      return { ...state, topics };
    },
    updateTopicsTree(state, {payload: {topicsTree}}) {
      return { ...state, topicsTree};
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
        const topicsTree = {};
        for (const com in graph) {
          const comTopics = {};
          let maxLen = -1;
          let representNode = '';
          for (const startTopic in graph[com]) {
            if (graph[com][startTopic].length > maxLen) {
              maxLen = graph[com][startTopic].length;
              representNode = res.topics[startTopic];
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
          topicsTree[representNode] = comTopics;
        }
        yield put({
          type: 'updateTopicsTree',
          payload: {
            topicsTree,
          }
        });
      }
    }
  },
  subscriptions: {},
}
