import React from 'react';

export default class Title extends React.Component {
  render() {
    return (
      <div>{ this.context.title }</div>
    );
  }
}

Title.contextTypes = {
  title: React.PropTypes.string.isRequired,
};
