
import React, { PropTypes } from 'react';
import { Input, Label, Menu } from 'stardust';

import menuStyle from './index.less';

export default class Shown extends React.Component {
  constructor(props) {
    super(props);
    this.createMenuItem = this.createMenuItem.bind(this);
  }

  // How it should end up looking...
  // <Menu.Item
  //   name="name_of_item"
  //   active={activeItem === 'name_of_item'}
  //   onClick={handleItemClick.call(this, 'name_of_item')}
  // >
  //   <Label color="grey" onClick={hideMenu} ><b>The label</b></Label>
  //   The text
  // </Menu.Item>

  createMenuItem(name, ItemLabel, text) {
    const { activeItem, handleItemClick } = this.props;

    return (
      <Menu.Item
        name={name}
        active={activeItem === name}
        onClick={handleItemClick.call(this, name)}
      >
        {ItemLabel}
        {text}
      </Menu.Item>
    );
  }

  render() {
    const { hideMenu } = this.props;
    return (
      <Menu vertical className={menuStyle.menu}>
        {
          this.createMenuItem(
            'login',
            <Label color="grey" onClick={hideMenu} ><b>X</b></Label>,
            'Login or user name'
          )
        }

        {
          this.createMenuItem(
            'new',
            <Label color="teal">16</Label>,
            'New since 4 days ago'
          )
        }

        {
          this.createMenuItem(
            'updates',
            <Label>4</Label>,
            'Updates'
          )
        }

        <Menu.Item>
          <Input className="icon" icon="search" placeholder="Search mail..." />
        </Menu.Item>
      </Menu>
    );
  }
}

Shown.propTypes = {
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired,
};
