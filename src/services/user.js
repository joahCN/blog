import request from '../utils/request';

export function login(provider) {
  return request.get(`/login/${provider}`);
}

export function getUserInfo() {
  return request.get('/user')
}
