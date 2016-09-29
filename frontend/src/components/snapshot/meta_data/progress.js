import React from 'react';

// Because imported from node_modules dir? 90% sure.
import 'rc-slider/assets/index.css';
import RCSlider from 'rc-slider';
import './progress.less';

const Progress = () => (
  <div className="snapshot_meta_data_progress">
    <div className="slider_container">
      <div>Track your progress</div>
      <RCSlider />
    </div>
  </div>
);

export default Progress;
