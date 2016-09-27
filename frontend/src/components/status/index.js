
import React from 'react';
import RequestStatus from './request';

export default class Status extends React.Component {
  render() {
    return <div className='ui center aligned grid status_index'>
      <RequestStatus status={ this.props.status }/>
    </div>;
  }
}
