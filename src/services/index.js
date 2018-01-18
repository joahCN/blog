import { list as articleList, create, deleteArticle } from './article';
import {list as categoryList} from './category';
export {login, getUserInfo} from './user';

export const article = {
  list: articleList,
  create,
  deleteArticle
};

export const category = {
  list: categoryList
};
