import React from 'react';

import NotificationWrapper from './notification';
import ModalMessageBox from './modal_message_box';

const RequestStatus = (props) => {
  const { status } = props;
  const { error } = status;

  // const error = {
  //   message: 'Test stub error obj\nLine 2 of test stub error obj'
  // };

  if (error) {
    info(error, 'ERROR...');

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
