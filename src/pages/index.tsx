import React from 'react';
import {connect} from 'dva';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import { router } from 'umi';

class Index extends React.Component<any, any> {
  componentDidMount(): void {
    if (!this.props.auth) {
      router.push('/login');
    }
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={styles.normal}>
        <div />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
          <li>
            <a href="https://umijs.org/guide/getting-started.html">
              {formatMessage({ id: 'index.start' })}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const {authToken: auth} = state.userData;
  return {
    auth,
  }
}

export default connect(mapStateToProps)(Index);
