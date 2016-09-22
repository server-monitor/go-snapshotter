import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSnapshots, removeSnapshot } from '../../actions';
import List from '../../components/snapshot/list';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { getSnapshots, removeSnapshot },
    dispatch
  );

const mapStateToProps = (state) => ({
  snapshots: state.snapshots,
});

const SnapshotList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export default SnapshotList;
