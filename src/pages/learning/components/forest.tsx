import React from 'react';
// @ts-ignore
import {drawMap} from '../../../modules/topicDependenceVisualization';

class Forest extends React.Component<any, any> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div>
        <svg id="map" width="800" height="800">
        </svg>
        <svg
          id="tree"
          style={{
            position: 'absolute',
            left: 10,
            marginLeft: 240,
            visibility: 'hidden',
            top: 10,
            marginTop: 56
          }}>
        </svg>
      </div>
    );
  }

  componentDidMount(): void {
    const {currentDomainName, clickTopic, clickFacet} = this.props;
    if (currentDomainName) {
      const treesvg = document.getElementById('tree');

      const svg = document.getElementById('map');
      drawMap(svg, treesvg, currentDomainName, (topicId: number, topicName: string) => {clickTopic(topicName)}, clickFacet);
    }
  }
}

export default Forest;
