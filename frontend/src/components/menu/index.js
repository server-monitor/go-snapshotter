import React, { PropTypes } from 'react';

import Hidden from './hidden';
import Shown from './shown';

export default class MenuIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'login' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    return (e, { name }) => this.setState({ activeItem: name });
  }

  render() {
    const { menu, hideMenu, showMenu } = this.props;
    if (menu.visible) {
      return (
        <Shown
          activeItem={this.state.activeItem}
          hideMenu={hideMenu}
          handleItemClick={this.handleItemClick}
        />
      );
    }

    return <Hidden showMenu={showMenu} />;
  }
}

MenuIndex.propTypes = {
  showMenu: PropTypes.func.isRequired,
  menu: PropTypes.shape().isRequired,
  hideMenu: PropTypes.func.isRequired,
};
