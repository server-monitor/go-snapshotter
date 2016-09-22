import React from 'react';
import Title from './title';
import Category from './category';

export default class Box extends React.Component {
  render() {
    return (
      <div className="meta_data_box">
        <Title />
        <Category />
      </div>
    ); // /
  }
}
