import React from 'react';

export default class Title extends React.Component {
  render() {
    return (
      <div>{ this.context.title }</div>
    );

    // return (
    //   <span>{ this.context.title }</span>
    // );
  }
}

Title.contextTypes = {
  title: React.PropTypes.string.isRequired,
};
