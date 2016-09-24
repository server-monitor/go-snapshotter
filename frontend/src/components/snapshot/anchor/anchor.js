import React from 'react';
import Image from './image';

export default class Anchor extends React.Component {
  render() {
    return (
      <a href={ this.context.url } target="_blank">
        <Image />
      </a>
    );
  }
}

Anchor.contextTypes = {
  url: React.PropTypes.string.isRequired,
};
