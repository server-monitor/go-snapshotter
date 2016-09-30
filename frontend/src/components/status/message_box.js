import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import { Message, Button, Icon } from 'stardust';

import { buildMessageElement } from './helpers';

export default class modalMessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: true, timerID: null };
    this.closeModal = this.closeModal.bind(this);
    this.setTimerID = this.setTimerID.bind(this);
  }

  componentDidMount() {
    const { closeModalAfterMS } = this.props;

    if (closeModalAfterMS) {
      const timerID = setTimeout(
          () => { this.closeModal(); }, closeModalAfterMS
      );

      this.setTimerID(timerID);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setTimerID(id) {
    this.setState({ timerID: id });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { messageType, header, message, messageList } = this.props;
    const messageElement = buildMessageElement(message, messageList);

    // https://github.com/reactjs/react-modal
    const modalContentStyle = {
      overlay: {
        zIndex: 4, // !!IMPORTANT!!

        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 10, 10, 0.70)',
      },

      content: {
        left: '20%',
        right: '20%',
        bottom: '50%',
        background: 'rgba(10, 10, 10, 0.80)',
      },
    };

    // ... list prop doesn't work?
    // https://technologyadvice.github.io/stardust/collections/message
    // <Message
    //  error
    //   header='There was some errors with your submission'
    //   list={[
    //     'You must include both a upper and lower case letters in your password.',
    //     'You need to select your home country.',
    //   ]}
    // />

    // Semantic UI classes, to make the button float right.
    //   There's probably a better way to do this.
    // ... className="close icon"

    // https://stackoverflow.com/questions/31163693/how-to-conditionally-add-attributes-to-react-components
    // ...inputProps
    // Stardust...
    // messageType = { `${messageClass}`: true }
    //   => <Message {...messageType}>
    //   => <Message error={true}>
    //   => <Message error>

    return (
      <Modal
        // shouldCloseOnOverlayClick={false}
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={modalContentStyle}
      >
        <Message {...messageType}>
          <Button icon onClick={this.closeModal} className="close icon">
            <Icon name="close" />
          </Button>
          <Message.Header>
            {header}
          </Message.Header>
          {messageElement}
        </Message>
      </Modal>
    );
  }
}

modalMessageBox.propTypes = {
  messageType: PropTypes.shape(

  ),
  header: PropTypes.string,
  message: PropTypes.string,
  messageList: PropTypes.arrayOf(PropTypes.string),
  closeModalAfterMS: PropTypes.number,
};
