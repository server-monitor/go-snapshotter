import React from 'react';

import NotificationWrapper from './notification';
import ModalMessageBox from './modal_message_box';

const RequestStatus = (props) => {
  const { status } = props;
  const { error } = status;

  if (error) {
    info(error, 'ERROR...');

    // const str = JSON.stringify(error);

    // https://stackoverflow.com/questions/31163693/how-to-conditionally-add-attributes-to-react-components
    // ...inputProps
    // Stardust...
    // messageType = { `${messageClass}`: true }
    //   => <Message {...messageType}>
    //   => <Message error={true}>
    //   => <Message error>

    return (<ModalMessageBox
      messageType={{ error: true }}
      header="ERROR"
      messageList={error.message.split('\n').concat('Please try again later')}
    />);
  }

  return (<NotificationWrapper
    message="Request OK"
    dismissAfter={5000}
  />);
};

RequestStatus.propTypes = {
  status: React.PropTypes.shape(),
};

export default RequestStatus;
