import React from 'react';

interface ILeafProps {
  assemble: {
    assembleId: number;
    assembleContent: string;
    assembleScratchTime: string;
    facetId: number;
    sourceId: number;
    domainId: number;
    type: string;
  }
}

class Leaf extends React.Component<ILeafProps, any> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {assemble} = this.props;
    return (
      <div>
        {/*info: 数据源、爬取时间*/}
        <div>
          {assemble.assembleScratchTime}
        </div>
        {/*content*/}
        <div>
          <div dangerouslySetInnerHTML={{__html: assemble.assembleContent}}>
          </div>
        </div>
      </div>
    );
  }
}

export default Leaf;
