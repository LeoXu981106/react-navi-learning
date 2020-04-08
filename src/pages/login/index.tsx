import React from 'react';
import { connect } from 'dva';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Checkbox, Input, Button } from 'antd';
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
    if (sessionStorage.authToken) {
      this.props.dispatch({
        type: 'userData/updateAuthToken',
        payload: {
          authToken: sessionStorage.authToken,
        },
      });
      history.push('/home');
    }
  }

  render() {
    const { username, passwd, auth } = this.props;
    const img = require('../../assets/bgNow.jpg');
    return (
      <div>
        <img className={styles.bg} src={img} />
        <div className={styles.login}>
          <div className={styles['login-title']}>
            账号密码登录
          </div>
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
            value={username}
            onChange={this.handleUsernameChange}
            className={styles['login-input']}
          />
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
            value={passwd}
            onChange={this.handlePasswdChange}
            className={styles['login-input']}
          />
          <Checkbox>记住我</Checkbox>
          <a className={styles['login-form-forgot']} href="">
            忘记密码
        </a>
          <Button type="primary" className={styles['login-form-button']} onClick={this.handleClickSignIn}>
            登录
        </Button>
        Or
        <a href="" className={styles['login-form-forgot']} onClick={this.handleClickSignUp}>注册</a>
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
