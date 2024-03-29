
import React from 'react';

export function buildMessageElement(message, messageList) {
  let messageElement = '';

  if (message) {
    messageElement = <p>{ message }</p>;
  } else if (messageList) {
    messageElement = (
      <ul className="list">
        { messageList.map((line, ix) => <li key={ix}>{ line }</li>) }
      </ul>
    );
  }

  return messageElement;
}

export default {
  buildMessageElement,
};
