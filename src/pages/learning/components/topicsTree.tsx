import React from 'react';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import * as styles from './topicsTree.scss';

const { TreeNode, DirectoryTree } = Tree;

class TopicsTree extends React.Component<any, any> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const { topicsTree, clickTopic, learningPath, showOnlyPath } = this.props;
    return (
      <Tree
        showLine={learningPath.length !== 0}
        style={{ background: '#fafafa' }}
        switcherIcon={<DownOutlined />}
        defaultExpandAll={true}
        onClick={(e, n) => {
          if (n.props.isLeaf) {
            clickTopic(n.props.eventKey);
          }
        }}
      >
        {
          topicsTree.map(parentNode => {
            if (learningPath.length === 0) {
              return (
                <TreeNode title={parentNode.topicName} key={parentNode.topicName + ' parent'}>
                  {
                    parentNode.children.map(topic => {
                      return (
                        <TreeNode
                          title={topic.topicName}
                          key={topic.topicId}
                          isLeaf
                        />
                      );
                    })
                  }
                </TreeNode>
              );
            } else {
              if (parentNode.children.filter(x => learningPath.indexOf(x.topicId) !== -1).length !== 0) {
                return (
                  <TreeNode title={parentNode.topicName} key={parentNode.topicName + ' parent'}>
                    {
                      parentNode.children.map(topic => {
                        if (learningPath.length === 0) {
                          return (
                            <TreeNode
                              title={topic.topicName}
                              key={topic.topicId}
                              isLeaf
                            />
                          );
                        }
                        if (learningPath.indexOf(topic.topicId) !== -1) {
                          return (
                            <TreeNode
                              title={topic.topicName}
                              key={topic.topicId}
                              isLeaf
                            />
                          );
                        } else {
                          if (!showOnlyPath) {
                            return (
                              <TreeNode
                                className={styles['tree-node-no-focus']}
                                title={topic.topicName}
                                key={topic.topicId}
                                isLeaf
                              />
                            );
                          }
                        }
                      })
                    }
                  </TreeNode>
                );
              } else {
                if (!showOnlyPath) {
                  return (
                    <TreeNode title={parentNode.topicName} key={parentNode.topicName + ' parent'}>
                    {
                      parentNode.children.map(topic => {
                        return (
                          <TreeNode
                            className={styles['tree-node-no-focus']}
                            title={topic.topicName}
                            key={topic.topicId}
                            isLeaf
                          />
                        );
                      })
                    }
                  </TreeNode>
                  );
                }
              }
            }
          })
        }
      </Tree>
    );
  }
}

export default TopicsTree;
