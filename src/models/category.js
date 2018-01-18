import update from 'immutability-helper';
import * as request from '../services/index';

export default {

  namespace: 'category',

  state: {
    categories: [
    ]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *list(action, { call, put }) {
      const datas = yield call(request.category.list);
      const list = datas.data.categories;
      yield put({ type: 'categories', data: list });
    },
    *submit(action, { call, put }) {  // eslint-disable-line

    },
  },

  reducers: {
    categories(state, action) {
      return update(state, { categories: { $set: action.data } });
    }
  },

};
