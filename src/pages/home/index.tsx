import React from 'react';
import { connect } from 'dva';
import { Card, Col, Row } from 'antd';

import styles from './index.css';
import Domain from '@/pages/home/components/domain';
import { history } from 'umi';

class Home extends React.Component<any, any> {
  componentDidMount(): void {
    this.props.dispatch({
      type: 'home/getSubjects',
    });
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  handleCardClick = (currentSubjectName: string) => {
    this.props.dispatch({
      type: 'home/updateCurrentSubjectName',
      payload: {
        currentSubjectName,
      },
    });
  };

  handleDomainClick = (currentDomainName: string) => {
    this.props.dispatch({
      type: 'globalData/updateCurrentDomainName',
      payload: {
        currentDomainName,
      }
    });
    history.push('/learning');
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {subjects, currentSubjectName} = this.props;
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
          {
            currentSubjectName === '' ?
            subjects.map(data => (
              <Col span={8} key={data.subject_id} className={styles.col}>
                <Card title={data.subject_name} bordered={false} bodyStyle={{ maxHeight: 200, height: 200, overflow: 'auto' }} hoverable onClick={() => this.handleCardClick(data.subject_name)}>
                  <div>
                    {data.description}
                  </div>
                </Card>
              </Col>
            )) :
              <Domain clickDomainCard={(domainName: string) => this.handleDomainClick(domainName)}/>
          }
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const {subjects, currentSubjectName} = state.home;
  return {
    subjects,
    currentSubjectName
  }
}

export default connect(mapStateToProps)(Home);
