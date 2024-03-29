import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRequestStatus } from '../../actions';
import StatusComponent from '../../components/status';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setRequestStatus },
    dispatch
  );

const mapStateToProps = state => ({
  status: state.status,
});

const StatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusComponent);

export default StatusContainer;
