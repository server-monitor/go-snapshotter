import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRequestStatus } from '../../actions';
import Component from '../../components/status';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { setRequestStatus },
    dispatch
  );

const mapStateToProps = (state) => ({
  status: state.status,
});

const Status = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default Status;
