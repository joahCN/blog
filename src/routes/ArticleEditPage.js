import React from 'react';
import LzEditor from 'react-lz-editor';
import { Breadcrumb, Button, Row, Col, Form, Input } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Block } from '../components/index';

const FormItem = Form.Item;

class ArticleEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: this.props.article.content || '',
      title: this.props.article.title || '',
      validates: {
        htmlContent: true,
        title: true,
      },
      responseList: [],
    };
    this.content = '';
  }
  componentWillReceiveProps(newProps) {
    if (newProps.article !== this.props.article) {
      const article = newProps.article;
      this.setState({
        htmlContent: article.content,
        title: article.title,
      });
    }
  }
  receiveHtml = (content) => {
    console.log(content);
    this.content = content;
    // this.setState({ htmlContent: content });
  };
  cancelEdit = () => {
    this.props.history.push('/articles');
  };
  submit = () => {
    const data = {
      content: this.content,
      title: this.state.title,
      id: this.props.article.id || '',
    };
    this.props.dispatch({ type: 'articles/submit', data });
    this.props.history.push('/articles');
  };
  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  render() {
    const uploadProps = {
      action: 'age',
      onChange: this.onChange,
      listType: 'picture',
      fileList: this.state.responseList,
      data: () => {

      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true,
    };
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (
      <div>
        <Block>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/articles">文章列表</Link></Breadcrumb.Item>
            <Breadcrumb.Item>添加文章</Breadcrumb.Item>
          </Breadcrumb>
        </Block>
        <Block>
          <Form>
            <FormItem
              {...formItemLayout}
              label="文章标题"
              validateStatus={this.state.validates.title}
            >
              <Input
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </FormItem>
          </Form>
        </Block>
        <Block>
          <LzEditor
            active={true}
            importContent={this.state.htmlContent}
            cbReceiver={this.receiveHtml}
            uploadProps={uploadProps}
          />
        </Block>
        <Block>
          <Row>
            <Col span={6}>
              <Button onClick={this.cancelEdit}>取消</Button>
            </Col>
            <Col offset={12} span={6} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={this.submit}>提交</Button>
            </Col>
          </Row>
        </Block>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (!state.articles.list || state.articles.list.length === 0) {
    return {};
  }
  const articleId = state.articles.editId;
  const editArticles = state.articles.list.filter((article) => {
    return article.id === articleId;
  });
  return {
    article: editArticles ? editArticles[0] : '',
  };
};

export default connect(mapStateToProps)(ArticleEditPage);
