
import React from 'react';
import { Grid } from 'stardust';

import RequestStatus from './request';

export default class Status extends React.Component {
  render() {
    return (
      <Grid textAlign='center'>
        <RequestStatus status={ this.props.status }/>
      </Grid>
    );

    // return <div className='ui center aligned grid'>
    //   <RequestStatus status={ this.props.status }/>
    // </div>;
  }
}
