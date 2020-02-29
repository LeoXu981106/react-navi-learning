export default {
  namespace: 'userData',
  state: {
    authToken: '',
  },
  reducers: {
    updateAuthToken(state, { payload: { authToken }}) {
      return { ...state, authToken};
    },
  },
  effects: {
  },
  subscriptions: {},
}
