import React from 'react';
import { connect } from 'dva';
import { Row, Col, Avatar } from 'antd';

function HomePage({user}) {
  return (
    <div>
      <Row>
        <Col>
          <Avatar src={user.image}></Avatar>
        </Col>
      </Row>
      <Row>
        <Col span={8}>{user.name}</Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {
    user: state.user.user
  }
};

export default connect(mapStateToProps)(HomePage);
