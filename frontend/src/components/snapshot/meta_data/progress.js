import React from 'react';

import 'rc-slider/assets/index.css';
import RCSlider from 'rc-slider';

// import styles from './progress.css';
import './progress.less';

export default class Progress extends React.Component {
  render() {
    return (
      <div className='progress'>
        <div className='slider_container'>
          <div>Track your progress</div>
          <RCSlider />
        </div>
      </div>
    );
  }
}
