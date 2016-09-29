
import React from 'react';
import { Grid } from 'stardust';

import RequestStatus from './request';

const Status = ({ status }) => (
  <Grid textAlign="center"><RequestStatus status={status} /></Grid>
);

Status.propTypes = {
  status: React.PropTypes.shape().isRequired,
};

export default Status;
