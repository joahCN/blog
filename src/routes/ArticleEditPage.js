import React from 'react';
import LzEditor from 'react-lz-editor';
import { Breadcrumb, Button, Row, Col, Form, Input, Select } from 'antd';
import 'antd/lib/modal/style/index.css'
import 'antd/lib/message/style/index.css';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Block } from '../components/index';
import config from '../config';

const Option = Select.Option;

const FormItem = Form.Item;

class ArticleEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: this.props.article.content || '',
      title: this.props.article.title || '',
      category: this.props.article.type ||'',
      validates: {
        htmlContent: true,
        title: true,
      },
      responseList: [],
    };
    this.content = '';
  }

  componentDidMount() {
    this.props.dispatch({ type: 'category/list' });
  }

  componentWillReceiveProps(newProps) {
    if ((newProps.article != this.props.article) && newProps.article.content) {
      const article = newProps.article;
      this.setState({
        htmlContent: article.content,
        title: article.title,
      });
    }
  }
  receiveHtml = (content) => {
    var that = this;
    console.log(content);
    that.content = content;
    // this.setState({ htmlContent: content });
  };
  cancelEdit = () => {
    this.props.history.push(this.props.listPage);
  };
  submit = () => {
    const data = {
      content: this.content || this.state.htmlContent,
      title: this.state.title,
      id: this.props.article.id || '',
      type: this.state.category,
      coverPage: this.state.responseList.length ? this.state.responseList[0].url.substring(0,this.state.responseList[0].url.lastIndexOf("?")) : ''
    };
    this.props.dispatch({ type: 'articles/submit', data });
    this.props.history.push(this.props.listPage);
  };
  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  handleCategoryChange = (value) => {
    this.setState({
      category: value,
    });
  };
  handleChange = ({file, fileList }) => {
    fileList.forEach((file)=>{
      if(file.response && file.response.success) {
        file.url = config.imageServerUrl + file.response.uploadFiles[0].url;
      }
    })

    this.setState({ responseList: fileList });
  };

  renderCategorySelector = () => {
    const categoryOptions = this.props.categories.map((category)=>{
      return <Option value={category.id}>{category.name}</Option>
    });
    return <Select value={this.state.category} onChange={this.handleCategoryChange}>
      {categoryOptions}
    </Select>
  }

  render() {
    const uploadProps = {
      action: `${config.serverUrl}/article/upload`,
      onChange: this.handleChange,
      listType: 'picture-card',
      fileList: this.state.responseList,
      multiple: true,
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
            <FormItem
              {...formItemLayout}
              label="文章分类"
            >
              {this.renderCategorySelector()}
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
  // if (!state.articles.list || state.articles.list.length === 0) {
  //   return {
  //     article: {},
  //     categories: []
  //   };
  // }
  const articleId = state.articles.editId;
  const editArticles = state.articles.list.filter((article) => {
    return article.id === articleId;
  });
  return {
    article: editArticles && editArticles.length ? editArticles[0] : {},
    categories: state.category.categories || []
  };
};

export default connect(mapStateToProps)(ArticleEditPage);
