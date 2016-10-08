
import { SHOW_MENU, HIDE_MENU } from './type';

export function showMenu() {
  return {
    type: SHOW_MENU
  };
}

export function hideMenu() {
  return {
    type: HIDE_MENU
  };
}
