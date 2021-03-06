import update from 'immutability-helper';
import * as request from '../services/index';

export default {

  namespace: 'articles',

  state: {
    list: [
    ],
    editId: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *list(action, { call, put }) {
      const datas = yield call(request.article.list);
      const list = datas.data.list;
      yield put({ type: 'articleList', data: list });
    },
    *submit(action, { call, put }) {  // eslint-disable-line
      console.log(`action: ${JSON.stringify(action)}`);
      const result = yield call(request.article.create, [action.data]);
      if (result.data.success) {
        yield put({ type: 'list' });
      }
      // yield put({ type: 'updateArticleList', data: action.data });
    },
    *deleteArticle(action, {call, put}) {
      const id = action.id;
      let result = yield call(request.article.deleteArticle, [{id}]);
      if(result.data.success) {
        yield put({ type: 'updateList', deleted: [id] });
      }
    }
  },

  reducers: {
    articleList(state, action) {
      return update(state, { list: { $set: action.data } });
    },
    updateArticleList(state, action) {
      return update(state, { list: { $push: [{ id: 4, key: 4, name: action.data.title }] } });
    },
    editArticle(state, action) {
      const editId = action.id;
      return update(state, { editId: { $set: editId } });
    },
    updateList(state, action) {
      const deleted = action.deleted;
      const availableList = state.list.filter((article)=>{
        return !~deleted.indexOf(article.id)
      });
      return update(state, { list: { $set: availableList}});
    }
  },

};
