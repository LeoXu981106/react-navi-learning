import React from 'react';
import { connect } from 'dva';
import { Checkbox, Form, Icon, Input, Button } from 'antd';
import { loginAPI } from '@/services/login';
import './index.css';
import { router } from 'umi';

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

      router.push('/home');
    }
  }

  componentDidMount(): void {
    console.log(this.props);
  }

  render() {
    const {username, passwd, auth } = this.props;
    console.log(auth);
    return (
      <div>
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
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
        <Button type="primary" className="login-form-button" onClick={this.handleClickSignIn}>
          Log in
        </Button>
        Or
        <a href="" onClick={this.handleClickSignUp}>register now!</a>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { username, passwd } = state.login;
  const {authToken: auth} = state.userData;
  return {
    username,
    passwd,
    auth,
  }
}

export default connect(mapStateToProps)(Login);
