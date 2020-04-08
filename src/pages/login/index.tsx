import React from 'react';
import { connect } from 'dva';
import { Checkbox, Form, Icon, Input, Button } from 'antd';
import { loginAPI } from '@/services/login';
import styles from './index.scss';
import { history } from 'umi';

class Login extends React.Component {
  handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(await loginAPI.getToken());
  };

  handleUsernameChange = (e) => {
    console.log(e);
    this.props.dispatch({
      type: 'login/updateUsername',
      payload: {
        username: e.target.value,
      },
    });
  };

  handlePasswdChange = (e) => {
    console.log(e);
    this.props.dispatch({
      type: 'login/updatePasswd',
      payload: {
        passwd: e.target.value,
      },
    });
  };

  handleClickSignUp = () => {
    this.props.dispatch({
      type: 'login/signUp',
    });
  };

  handleClickSignIn = () => {
    this.props.dispatch({
      type: 'login/signIn',
    });
  };

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    console.log(this.props);
    if (this.props.auth) {

      history.push('/home');
    }
  }

  componentDidMount(): void {
    console.log(this.props);
  }

  render() {
    const { username, passwd, auth } = this.props;
    const img = require('../../assets/bgNow.jpg')
    return (
      <div>
        <img className={styles.bg} src={img} />
        <div className={styles.login}>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            value={username}
            onChange={this.handleUsernameChange}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            value={passwd}
            onChange={this.handlePasswdChange}
          />
          <Checkbox>Remember me</Checkbox>
          <a className={styles.loginFormForgot} href="">
            Forgot password
        </a>
          <Button type="primary" className={styles.loginFormButton} onClick={this.handleClickSignIn}>
            Log in
        </Button>
        Or
        <a href="" onClick={this.handleClickSignUp}>register now!</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { username, passwd } = state.login;
  const { authToken: auth } = state.userData;
  return {
    username,
    passwd,
    auth,
  }
}

export default connect(mapStateToProps)(Login);
