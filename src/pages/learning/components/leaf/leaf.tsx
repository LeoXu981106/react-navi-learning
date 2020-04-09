import React from 'react';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

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
  state = {
    showMore: false,
  };

  handleClick = () => {
    this.setState({ showMore: !this.state.showMore })
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const { assemble } = this.props;
    return (
      <div style={{ borderRadius: 4, border: '1px solid #bfbfbf', marginBottom: 16 }}>
        {/*info: 数据源、爬取时间*/}
        <div style={{ padding: '4px 8px', borderBottom: '1px solid #bfbfbf' }}>
          爬取时间：{assemble.assembleScratchTime}
        </div>
        {/*content*/}
        <div style={{ padding: '4px 8px' }} onClick={this.handleClick}>
          {
            this.state.showMore ?
              (
                <div dangerouslySetInnerHTML={{__html: assemble.assembleContent}}></div>
              ) :
              (
                <HTMLEllipsis
                  unsafeHTML={assemble.assembleContent}
                  maxLine="5"
                  ellipsisHTML="<a>...查看更多</a>"
                  basedOn="letters"
                />
              )
          }

        </div>
      </div>
    );
  }
}

export default Leaf;
