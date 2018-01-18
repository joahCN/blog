import React from 'react';
import { Route } from 'dva/router';
// import { connect } from 'dva';
import ArticleEdit from './ArticleEditPage';
import ArticlesList from './ArticlesListPage';

function ArticlesPage({match}) {
  return (
    <div>
      <Route path={`${match.url}/`} exact component={ArticlesList} />
      <Route path={`${match.url}/add`} render={(props)=>{
        return <ArticleEdit {...props} listPage = {match.url}/>
      }} />
      <Route path={`${match.url}/edit`} component={ArticleEdit} />
    </div>
  );
}


export default ArticlesPage;
