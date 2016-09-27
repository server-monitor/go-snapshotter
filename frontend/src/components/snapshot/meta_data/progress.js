import React from 'react';

import 'rc-slider/assets/index.css';
import RCSlider from 'rc-slider';

// import styles from './progress.css';
import './progress.less';

export default class Progress extends React.Component {
  render() {
    return (
      <div className='progress' style={ { backgroundColor: 'none' } }>
        <div className='slider_container'>
          <div>Track your progress</div>
          <RCSlider />
        </div>
      </div>
    );
  }
}

// export default class Progress extends React.Component {
//   constructor (props, context) {
//     super(props, context);
//     this.state = {
//       value: 10,
//     };

//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(value) {
//     info('JAVASCRTIP', 'shit tier language for shit tier devs');
//     this.setState({
//       value: value,
//     });
//   }

//   render () {
//     const { value } = this.state;
//     return (
//       <div className='horizontal-slider'>
//       <h4>Basic Slider</h4>
//       <Slider
//         min={0}
//         max={100}
//         value={value}
//         onChange={this.handleChange}
//       />
//       <div className='value'>Progress: {value}</div>
//       <hr />
//       </div>
//     );
//   }

//   // constructor(props, context) {
//   //   super(props, context);
//   //   this.state = {
//   //     value: 10, /** Start value **/
//   //   };
//   // }

//   // handleChange(value) {
//   //   this.setState({
//   //     value: value,
//   //   });
//   // }

//   // render() {
//   //   let { value } = this.state;
//   //   return (
//   //       <div style={ { zIndex: 10 } } >
//   //         <Slider
//   //           value={value}
//   //           onChange={this.handleChange}
//   //         />
//   //         <div>Progress: {value}</div>
//   //       </div>
//   //   );
//   // }

//   // // render() {
//   // //   // value={Number}
//   // //   // onChange={Function}

//   // //   constructor(props, context) {
//   // //     super(props, context);
//   // //     this.state = {
//   // //       value: 10 /** Start value **/
//   // //     };
//   // //   }

//   // //   return (
//   // //     <div title='Progress'>
//   // //       <Slider
//   // //         min={0}
//   // //         max={100}
//   // //         step={1}
//   // //         orientation='horizontal'
//   // //       />
//   // //     </div>
//   // //   );
//   // // }
// }

// // Progress.contextTypes = {
// //   Progress: React.PropTypes.string.isRequired,
// // };
