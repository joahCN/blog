import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Block } from '../components/index';

function getColumns(onEdit, onDelete) {
  return [{
    title: 'Name',
    dataIndex: 'title',
    key: 'title',
    render: text => <span>{text}</span>,
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;" onClick={() => onEdit(record.id)}>Edit</a>
        <span className="ant-divider" />
        <a href="javascript:;" onClick = {() => onDelete(record.id)}>Delete</a>
      </span>
    ),
  }];
}

class ArticlesListPage extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: 'articles/list' });
  }
  addArticle = () => {
    this.props.dispatch({ type: 'articles/editArticle', id: '' });
    this.props.history.push(`${this.props.match.url}/add`);
  };
  onEdit = (articleId) => {
    this.props.dispatch({ type: 'articles/editArticle', id: articleId });
    this.props.history.push(`${this.props.match.url}/add`);
  };
  onDelete = (articleId) => {
    this.props.dispatch({ type: 'articles/deleteArticle', id: articleId})
  };
  render() {
    return (
      <div>
        <Block>
          <Button onClick={this.addArticle} type="primary">添加文章</Button>
        </Block>
        <Table columns={getColumns(this.onEdit, this.onDelete)} dataSource={this.props.data} />
      </div>
    );
  }
}


export default connect((state) => {
  return {
    data: state.articles.list || [],
  };
})(ArticlesListPage);
