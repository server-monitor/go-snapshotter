import React from 'react';

import NotificationWrapper from './notification';
import ModalMessageBox from './modal_message_box';

export default class Request extends React.Component {
  render() {
    const { status } = this.props;
    const { error } = status;

    if (error) {
      info(error, 'ERROR...');

      const str = JSON.stringify(error);
      return (<ModalMessageBox
        messageClass='error'
        header='ERROR'
        messageList={ error.message.split('\n').concat('Please try again later') }
      />);
    }

    return (<NotificationWrapper
      message='Request OK'
      dismissAfter={ 10000 }
    />);
  }
}

Request.propTypes = {
  status: React.PropTypes.object,
};
