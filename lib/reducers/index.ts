/* tslint:disable:no-namespace no-empty-interface max-classes-per-file no-shadowed-variable*/
import sideMenuState, {
  MINI,
  MAX,
  TO_MINI,
  TO_MAX,
  HIDE_MAX,
  HIDE_MINI,
  setMenuItems,
  setSideMenu,
  getSideMenuState,
  ISideMenuRootState as _ISideMenuRootState
} from './side-menu-state';

import localeState, { ILocaleRootState as _ILocaleRootState, setLocale } from './locale';

import { SUCCESS, FAILURE, REQUEST } from './action-type.util';

import { CurrentRouteAndIcon as _CurrentRouteAndIcon } from './route-position';

export namespace Locale {
  export interface ILocaleRootState extends _ILocaleRootState {}
  export const locale = {
    localeState,
    setLocale
  };
}
export const locale = Locale.locale;

export namespace SideMenu {
  export interface ISideMenuRootState extends _ISideMenuRootState {}

  export const sideMenu = {
    sideMenuState,
    MINI,
    MAX,
    TO_MINI,
    TO_MAX,
    HIDE_MAX,
    HIDE_MINI,
    setMenuItems,
    setSideMenu,
    getSideMenuState
  };
}

export const sideMenu = SideMenu.sideMenu;

export class CurrentRouteAndIcon extends _CurrentRouteAndIcon {}

export { FAILURE, REQUEST, SUCCESS };

/* tslint:enable:no-namespace no-empty-interface max-classes-per-file no-shadowed-variable*/
