import update from 'immutability-helper';
import * as request from '../services/index';

export default {

  namespace: 'user',

  state: {
    user: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      
    },
  },

  effects: {
    *login(action, { call, put }) {  // eslint-disable-line
      let provider = action.provider;
      yield call(request.login, [provider]);
    },
    *getUserInfo(action, { call, put }) {
      let response = yield call(request.getUserInfo);
      let data = response.data;
      if(data) {
        yield put({type: 'userInfo', userInfo: response.data.userInfo || ""});
      }
    }
  },

  reducers: {
    userInfo(state, action) {
      return update(state, { user: { $set: action.userInfo } });
    }
  },

};
