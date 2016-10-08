import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showMenu, hideMenu } from '../../actions';
import MenuComponent from '../../components/menu';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { showMenu, hideMenu },
    dispatch
  );

const mapStateToProps = state => ({
  menu: state.menu,
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuComponent);

export default MenuContainer;
