import React from 'react';
import {Tree} from 'antd';

const { TreeNode, DirectoryTree } = Tree;

class TopicsTree extends React.Component<any, any> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {topicsTree, clickTopic} = this.props;
    return (
      <DirectoryTree
        defaultExpandAll
        onClick={(e, n) => {
          if (n.props.isLeaf) {
            clickTopic(n.props.eventKey);
          }
        }}
      >
        {
          Object.keys(topicsTree).map(parentNode => (
            <TreeNode title={parentNode} key={parentNode + ' parent'}>
              {
                Object.keys(topicsTree[parentNode]).map(topic => (
                  <TreeNode
                    title={topicsTree[parentNode][topic]}
                    key={topic}
                    isLeaf
                />
                ))
              }
            </TreeNode>
          ))
        }
      </DirectoryTree>
    );
  }
}

export default TopicsTree;
