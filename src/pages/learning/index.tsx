import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import classnames from 'classnames';
import { select } from 'd3';
import TopicsTree from '@/pages/learning/components/topicsTree';
import Forest from '@/pages/learning/components/forest';
import * as styles from './index.css';
import { CloseOutlined } from '@ant-design/icons';
import { Select, Radio } from 'antd';
import Leaf from '@/pages/learning/components/leaf/leaf';

const { Option } = Select;

class Learning extends React.Component<any, any> {
  state = {
    showDetail: false,
    showOnlyPath: true,
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
    this.setState({ showDetail: true });
  };

  handleChangeLearningMethod = (learningMethod: string) => {
    this.props.dispatch({
      type: 'learning/updateLearningMethod',
      payload: {
        learningMethod,
      }
    });
    if (learningMethod === 'global') {
      this.props.dispatch({
        type: 'learning/updateLearningPath',
        payload: {
          learningPath: [],
        }
      });
    }
  };

  handleClickLearningTopic = (topicId: number) => {
    this.props.dispatch({
      type: 'learning/getPath',
      payload: {
        topicId
      }
    });
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {
      topicsTree,
      currentDomainName,
      assembles,
      learningMethod,
      topics,
      learningPath,
      learningTopicsTree,
      currentTopicName,
      currentFirstFacetName,
      currentSecondFacetName
    } = this.props;
    const { showDetail, showOnlyPath } = this.state;
    return (
      <div >
        <div className={styles['side-bar']}>
          <div className={styles['learning-method']}>
            <div style={{ marginBottom: 4 }}>
              学习方式：
            <Select defaultValue="global" style={{ width: 160 }} onChange={this.handleChangeLearningMethod}>
                <Option value="global">零基础</Option>
                <Option value="special">场景驱动</Option>
              </Select>
            </div>
            {
              learningMethod === 'special' &&
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择知识点"
                optionFilterProp="children"
                onChange={(value: string) => this.handleClickLearningTopic(parseInt(value))}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  Object.keys(topics).filter(x => x !== '-1').map(x => <Option value={x}>{topics[x]}</Option>)
                }
              </Select>
            }
          </div>
          <div className={classnames(styles['topics-header'], { [styles['topics-header-special']]: learningMethod === 'special' })}>
            <span style={{ padding: '0 8px', fontWeight: 600, fontSize: 16 }}>知识点列表</span>
            {
              learningPath.length !== 0
              &&
              <Radio.Button checked={showOnlyPath} onClick={() => this.setState({ showOnlyPath: !showOnlyPath })}>仅显示推荐路径</Radio.Button>
            }
          </div>
          <div className={classnames(styles['topics-tree'], { [styles['learning-special']]: learningMethod === 'special' })}>
            <TopicsTree
              topicsTree={learningPath.length !== 0 ? learningTopicsTree : topicsTree}
              clickTopic={this.handleClickTopicsTree}
              learningPath={learningPath}
              showOnlyPath={showOnlyPath}
            />
          </div>
        </div>
        <div style={{ marginLeft: 240, overflow: 'hidden', maxHeight: 'calc(100vh - 60px)' }}>
          {
            currentDomainName &&
            <Forest currentDomainName={currentDomainName} learningPath={learningPath} clickTopic={this.handleClickTopic} clickFacet={this.handleClickFacet} />
          }
        </div>
        <div className={classnames(styles.detail, { [styles.hidden]: !showDetail, [styles.shown]: showDetail })}>
          <div style={{ position: 'absolute', top: 0, padding: 4, width: '100%', backgroundColor: '#fafafa', borderBottom: '1px solid #d9d9d9' }}>
            <span style={{fontSize: 16, fontWeight: 600}}>
              {currentTopicName}-{currentFirstFacetName}{
                currentSecondFacetName && '-' + currentSecondFacetName
              }
            </span>
            <CloseOutlined
              style={{ position: 'absolute', right: 10, top: 10}}
              onClick={
                () => {
                  this.setState({ showDetail: false });
                }
              } />
          </div>
          <div style={{marginTop: 32, padding: 16}}>
            {
              assembles.map((assemble: { assembleId: number; assembleContent: string; assembleScratchTime: string; facetId: number; sourceId: number; domainId: number; type: string; }) => (
                <Leaf assemble={assemble} key={assemble.assembleId} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    if (this.props.authToken === '') {
      history.push('/login');
    } else {
      const { currentDomainName } = this.props;
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
  const { authToken } = state.userData;
  const {
    currentDomainName,
    assembles,
    currentTopicName,
    currentFirstFacetName,
    currentSecondFacetName
  } = state.globalData;
  const { topicsTree, learningMethod, topics, learningPath, learningTopicsTree } = state.learning;
  return {
    topics,
    authToken,
    currentDomainName,
    topicsTree,
    assembles,
    learningMethod,
    learningPath,
    learningTopicsTree,
    currentTopicName,
    currentFirstFacetName,
    currentSecondFacetName
  };
}

export default connect(mapPropsToState)(Learning);
