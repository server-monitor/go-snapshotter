import React from 'react';

export default class Category extends React.Component {
  render() {
    return (
      <div>Category: { this.context.meta.category }</div>
    );

    // return (
    //   <span>Category: { this.context.meta.category }</span>
    // );
  }
}

Category.contextTypes = {
  meta: React.PropTypes.object.isRequired,
};
