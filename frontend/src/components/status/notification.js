
import React, { Component } from 'react';
import { OrderedSet as orderedSet } from 'immutable';
import { NotificationStack } from 'react-notification';

import './notification.less';

export default class notificationWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: orderedSet(),

      // This is just used for the sake of an example to make sure
      // notifications have unique keys. In production, you should have
      // a different system for UIDs.
      count: 0,
    };

    this.removeNotification = this.removeNotification.bind(this);
  }

  componentDidMount() {
    this.addNotification(this.props);
  }

  addNotification({ message, dismissAfter }) {
    const { notifications, count } = this.state;
    // const id = notifications.size + 1;
    const newCount = count + 1;
    return this.setState({
      count: newCount,
      notifications: notifications.add({
        message,
        key: newCount,
        action: 'x',
        dismissAfter,
        onClick: () => this.removeNotification(newCount),
      }),
    });
  }

  removeNotification(count) {
    const { notifications } = this.state;
    this.setState({
      notifications: notifications.filter(n => n.key !== count),
    });
  }

  render() {
    // After a few sec of first run of testing...
    //   Warning: Exception thrown by hook while handling onSetChildren:
    //   Invariant Violation: Expected onBeforeMountComponent() parent and
    //   onSetChildren() to be consistent (13 has parents 0 and 12).
    //   On onDismiss={notification...} line

    return (
      <div className="status_notification">
        <NotificationStack
          notifications={this.state.notifications.toArray()}
          onDismiss={notification => this.setState({
            notifications: this.state.notifications.delete(notification),
          })}
        />
      </div>
    );
  }
}
