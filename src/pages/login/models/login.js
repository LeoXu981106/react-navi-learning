import NodeRSA from 'node-rsa';
import {createHash} from 'crypto-browserify';
import {loginAPI} from '../../../services/login';

export default {
  namespace: 'login',
  state: {
    username: '',
    passwd: '',
    token: '',
    publicKey: '',
  },
  reducers: {
    updateToken(state, { payload: { token, publicKey }}) {
      return { ...state, token, publicKey};
    },
    updateUsername(state, {payload: {username}}) {
      return { ...state, username };
    },
    updatePasswd(state, {payload: {passwd}}) {
      return { ...state, passwd };
    },
  },
  effects: {
    *getToken(action, { call, put }) {
      const data = yield call(loginAPI.getToken);
      yield put({
        type: 'updateToken',
        payload: {
          token: data.token,
          publicKey: data.publicKey,
        }
      })
    },
    *signUp(action, { call, select}) {
      const {token, publicKey} = yield call(loginAPI.getToken);
      const key = new NodeRSA();
      key.importKey(publicKey, 'public');
      const username = yield select(state => state.login.username);
      const passwd = yield select(state => state.login.passwd);
      const hash = createHash('sha256');
      hash.update(passwd);
      const pass = hash.digest('hex');
      const data = key.encrypt(JSON.stringify({
        username,
        passwd: pass,
      }), 'base64');
      const res = yield call(loginAPI.signUp, token, data);
      return res;
    },
    *signIn(action, { call, put, select}) {
      const {token, publicKey} = yield call(loginAPI.getToken);
      const key = new NodeRSA();
      key.importKey(publicKey, 'public');
      const username = yield select(state => state.login.username);
      const passwd = yield select(state => state.login.passwd);
      const hash = createHash('sha256');
      hash.update(passwd);
      const pass = hash.digest('hex');
      const data = key.encrypt(JSON.stringify({
        username,
        passwd: pass,
      }), 'base64');
      try {
        const res = yield call(loginAPI.signIn, token, data);
        yield put({
          type: 'userData/updateAuthToken',
          payload: {
            authToken: res.token,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  subscriptions: {},
}
