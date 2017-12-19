import React from 'react';
// import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
// import styles from './IndexPage.css';
import { Route, Redirect } from 'dva/router';
import HomePage from '../routes/HomePage';
import ArticlesPage from '../routes/ArticlesPage';

const { Header, Content, Footer, Sider } = Layout;

class IndexPage extends React.Component {

  switchMenuItem = ({ key }) => {
    const paths = {
      1: '/home',
      2: '/articles',
    };
    this.props.history.push(paths[key]);
  };

  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.switchMenuItem}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">个人信息</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">文章管理</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">图片中心</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 20px' }} >我的博客</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route path="/home" exact component={HomePage} />
              <Route path="/articles" component={ArticlesPage} />
              <Redirect to="/home" />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            个人博客
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
};

export default IndexPage;
