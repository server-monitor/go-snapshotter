import { SHOW_MENU, HIDE_MENU } from '../actions/type';

const menu = (state = { visible: true }, action) => {
  switch (action.type) {
  case SHOW_MENU:
    return { visible: true };

  case HIDE_MENU:
    return { visible: false };

  default:
    return state;
  }
};

export default menu;
