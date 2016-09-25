import React from 'react';

import MessageBox from './message_box';

export default class RequestStatus extends React.Component {
  render() {
    const { messageClass, header, message } = this.props;

    let messageElement = '';

    if (typeof message === 'string') {
      messageElement = <p>{ message }</p>;
    } else {
      messageElement = <ul className="list">
        { message.map((line, ix) => <li key={ ix }>{ line }</li>) }
      </ul>;
    }

    return (
      <div className={ 'ui ' + messageClass + ' message'}>
        <i className="close icon"></i>
        <div className="header">{ header }</div>
        { messageElement }
      </div>
    );
  }
}
