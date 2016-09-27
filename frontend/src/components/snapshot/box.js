
import React from 'react';
import AnchorBox from './anchor/box';
import ControlBox from './control/box';
import MetaDataBox from './meta_data/box';

import 'semantic-ui-css/semantic.css';

import semantic from 'semantic-ui-css/semantic.css';

export default class Box extends React.Component {
  getChildContext() {
    return {
      id: this.props.id,
      url: this.props.url,
      picture: this.props.picture,
      title: this.props.title,
      meta: this.props.meta,
      removeSnapshot: this.props.removeSnapshot,
    };
  }

  render() {
    const mobile = 'eight wide mobile';

    const tablet = 'five wide tablet';

    // const { five, wide, table } = semantic;
    // const tablet = [five, wide, table].join(' ');

    // info(semantic, 'semantic');
    // info(semantic.five, 'five');
    // info(tablet, 'tablet');

    const computer = 'four wide computer';
    const largeScreen = 'three wide large screen';

    // <div className={ `${mobile} ${tablet} ${computer} ${largeScreen} column` }>

    return (
      <div className={ `ui ${mobile} ${tablet} ${computer} ${largeScreen} column` }>
        <div className='card'>
          <AnchorBox />
          <ControlBox />
          <MetaDataBox />
        </div>
      </div>
    );
  }
}

Box.childContextTypes = {
  id: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  picture: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  removeSnapshot: React.PropTypes.func.isRequired,
};
