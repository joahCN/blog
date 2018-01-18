/**
 * Created by mac on 18/1/7.
 */
import React from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import {Block} from '../components/index';
import config from '../config'

class EntryPage extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'user/getUserInfo'});
  }

  componentWillReceiveProps(newProps) {
    if(!newProps.user || !newProps.user.id) {
      this.props.history.push(`${this.props.match.url}login`);
    } else {
      this.props.history.push(`${this.props.match.url}admin`);
    }
  }

  render() {
    return (
      <div>loading....</div>
    );
  }

}

let mapStateToProps = (state)=>{
  return {
    user: state.user.user
  }
};

export default connect(mapStateToProps)(EntryPage);
