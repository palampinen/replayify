import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveLogin } from '../../concepts/auth';

class Callback extends Component {
  componentDidMount() {
    this.props.saveLogin();
  }

  render() {
    return <div>Login OK</div>;
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = { saveLogin };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback);
