import React from 'react';

import Title from './title';
import Category from './category';
import CurrentTopic from './current_topic';
import Progress from './progress';

import './box.less';

export default class Box extends React.Component {
  render() {
    return (
      <div className='box'>
        <Title />
        <Category />
        <CurrentTopic />
        <Progress />
      </div>
    );
  }
}
