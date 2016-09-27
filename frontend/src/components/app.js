import React, { Component } from 'react';

import SnapshotList from '../containers/snapshot/list';
import Status from '../containers/status';

// import 'rc-slider/assets/index.css';
// import RCSlider from 'rc-slider';

// // import './progress.css';

// class Progress extends React.Component {
//   render() {
//     return (
//       <div className='progress' title='Progress'>
//         <div className='slider_container'>
//           <RCSlider />
//         </div>
//       </div>
//     );
//   }
// }
// <Progress />

export default class App extends Component {
  render() {
    return (
      <div>
        <SnapshotList />
        <Status />
      </div>
    );
  }
}
