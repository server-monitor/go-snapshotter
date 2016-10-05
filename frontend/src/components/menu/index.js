import React from 'react';
// import { Grid } from 'stardust';
import { Input, Label, Menu } from 'stardust';

import style from './index.less';

export default class MenuIndex extends React.Component {
  constructor() {
    super();
    this.state = { activeItem: 'login' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    return (e, { name }) => this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu vertical className={style.menu}>
        <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick}>
          Login
        </Menu.Item>

        <Menu.Item name="new" active={activeItem === 'new'} onClick={this.handleItemClick}>
          <Label color="teal">14</Label>
          New since 4 days ago
        </Menu.Item>

        <Menu.Item name="updates" active={activeItem === 'updates'} onClick={this.handleItemClick}>
          <Label>4</Label>
          Updates
        </Menu.Item>
        <Menu.Item>
          <Input className="icon" icon="search" placeholder="Search mail..." />
        </Menu.Item>
      </Menu>
    );
  }
}
