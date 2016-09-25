import React from 'react';

import MessageBox from './message_box';

export default class RequestStatus extends React.Component {
  render() {
    const { status } = this.props;
    const { error } = status;

    if (error) {
      info(error, 'ERROR...');

      const str = JSON.stringify(error);
      return (<MessageBox
        messageClass="error"
        header="ERROR"
        message={ error.message.split('\n') }
      />);

      // return (
      //   <div className="ui error message">
      //     <i className="close icon"></i>
      //     <div className="header">
      //       ERROR
      //     </div>
      //     <ul className="list">
      //       { error.message.split('\n').map((line, ix) => <li key={ ix }>{ line }</li>) }
      //     </ul>
      //   </div>
      // );
    }

    return (
      <span></span>
    );
  }
}
