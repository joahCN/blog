import request from '../utils/request';

export function list() {
  return request.get('/article/list');
}

export function create(datas) {
  console.log('datas: ' + JSON.stringify(datas));
  return request.post('/article/create', datas[0]);
}

export function deleteArticle(datas) {
  return request.post('/article/delete', datas[0]);
}
