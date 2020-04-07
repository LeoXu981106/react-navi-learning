import React from 'react';
import {connect} from 'dva';
import { history } from 'umi';
import classnames from 'classnames';
import {select} from 'd3';
import TopicsTree from '@/pages/learning/components/topicsTree';
import Forest from '@/pages/learning/components/forest';
import * as styles from './index.css';
import { Button, Icon } from 'antd';
import Leaf from '@/pages/learning/components/leaf/leaf';

class Learning extends React.Component<any, any> {
  state = {
    showDetail: false,
  };

  handleClickTopicsTree = (currentTopicId: string) => {
    if (document.getElementById(currentTopicId) !== null) {
      select(document.getElementById(currentTopicId)).dispatch('click');
    }
  };

  handleClickTopic = (currentTopicName: string) => {
    this.props.dispatch({
      type: 'globalData/updateCurrentTopicName',
      payload: {
        currentTopicName,
      },
    });
  };

  handleClickFacet = (facetId: number) => {
    this.props.dispatch({
      type: 'globalData/getFacetNamesByFacetId',
      payload: {
        facetId,
      },
    });
    this.setState({showDetail: true});
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {topicsTree, currentDomainName, assembles} = this.props;
    const {showDetail} = this.state;
    return (
      <div>
        <div style={{position: 'fixed', maxHeight: 'calc(100vh - 56px)', overflow: 'auto', width: 240}}>
          <TopicsTree topicsTree={topicsTree} clickTopic={this.handleClickTopicsTree}/>
        </div>
        <div style={{ marginLeft: 240, overflow: 'hidden', maxHeight: 'calc(100vh - 60px)' }}>
          {
            currentDomainName &&
            <Forest currentDomainName={currentDomainName} clickTopic={this.handleClickTopic} clickFacet={this.handleClickFacet}/>
          }
        </div>
        <div className={classnames(styles.detail, { [styles.hidden]: !showDetail, [styles.shown]: showDetail})}>
          <div style={{textAlign: 'right'}}>
            <Icon type="close" onClick={
              () => {
                this.setState({showDetail: false});
              }
            }/>
          </div>
          {
            assembles.map((assemble: { assembleId: number; assembleContent: string; assembleScratchTime: string; facetId: number; sourceId: number; domainId: number; type: string; }) => (
              <Leaf assemble={assemble} key={assemble.assembleId}/>
            ))
          }
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    if (this.props.authToken === '') {
      history.push('/login');
    } else {
      const {currentDomainName} = this.props;
      this.props.dispatch({
        type: 'learning/getDependence',
        payload: {
          domainName: currentDomainName,
        }
      });
    }
  }
}

function mapPropsToState(state: any) {
  const {authToken} = state.userData;
  const {currentDomainName, assembles} = state.globalData;
  const {topicsTree} = state.learning;
  return {
    authToken,
    currentDomainName,
    topicsTree,
    assembles
  };
}

export default connect(mapPropsToState)(Learning);
