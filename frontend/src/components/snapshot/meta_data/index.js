import React from 'react';

import Title from './title';
import Category from './category';
import CurrentTopic from './current_topic';
import Progress from './progress';

import './index.less';

export default class Index extends React.Component {
  render() {
    return (
      <div className='index'>
        <Title />
        <Category />
        <CurrentTopic />
        <Progress />
      </div>
    );
  }
}
