import React from 'react';
import {connect} from 'dva';
import { Card, Col } from 'antd';
import styles from '@/pages/home/index.css';

class Domain extends React.Component<any, any> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {domains, clickDomainCard} = this.props;
    return (
      domains.map(domain => {
        let Img;
        try {
          Img = require('../../../assets/' + domain.domainId + '.png');
        } catch (e) {
          Img = require('../../../assets/5.png');;
        }
        return (
          <Col span={8} key={domain.domainId} className={styles.col}>
            <Card title={domain.domainName} bordered={false} bodyStyle={{ maxHeight: 200, overflow: 'auto', padding: 0 }}
                  hoverable
                  cover={
                    <img
                      alt={domain.domainName}
                      src={Img}
                    />
                  }
                  onClick={() => clickDomainCard(domain.domainName)}
            >
            </Card>
          </Col>
        );
      })
    );
  }

  componentDidMount(): void {
    const {currentSubjectName} = this.props;
    this.props.dispatch({
      type: 'home/getDomains',
      payload: {
        currentSubjectName,
      },
    });
  }
}

function mapPropsToState(state: any) {
  const {domains, currentSubjectName} = state.home;
  return {
    domains,
    currentSubjectName
  };
}

export default connect(mapPropsToState)(Domain);
