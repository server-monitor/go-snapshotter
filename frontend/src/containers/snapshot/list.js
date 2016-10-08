import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSnapshots, removeSnapshot } from '../../actions';
import SnapshotListComponent from '../../components/snapshot/list';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getSnapshots, removeSnapshot },
    dispatch
  );

const mapStateToProps = state => ({
  snapshots: state.snapshots,
});

const SnapshotListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnapshotListComponent);

export default SnapshotListContainer;
