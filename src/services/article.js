import request from '../utils/request';

export function list() {
  return request('/article/list');
}

export function create(datas) {
  console.log('datas: ' + JSON.stringify(datas));
  return request('/article/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datas[0]),
  });
}
