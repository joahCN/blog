import React from 'react';
import { Route } from 'dva/router';
// import { connect } from 'dva';
import ArticleEdit from './ArticleEditPage';
import ArticlesList from './ArticlesListPage';

function ArticlesPage() {
  return (
    <div>
      <Route path="/articles" exact component={ArticlesList} />
      <Route path="/articles/add" component={ArticleEdit} />
      <Route path="/articles/edit" component={ArticleEdit} />
    </div>
  );
}


export default ArticlesPage;
