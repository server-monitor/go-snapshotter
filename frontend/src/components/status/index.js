
import React from 'react';
import RequestStatus from './request';

export default class Status extends React.Component {
  render() {
    // info(this, 'this in req stat');
    return <div className="ui center aligned grid status_box">
      <RequestStatus status={ this.props.status }/>
    </div>;
  }
}
