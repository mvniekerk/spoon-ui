import { CurrentRouteAndIcon } from './route-position';

export const MAX = 'MAX';
export const TO_MAX = 'TO_MAX';
export const MINI = 'MINI';
export const TO_MINI = 'TO_MINI';
export const HIDE_MAX = 'HIDE_MAX';
export const HIDE_MINI = 'HIDE_MINI';

export const ACTION_TYPES = {
  SET_SIDEMENU: 'sidemenu/SET_SIDEMENU',
  GET_SIDEMENU: 'sidemenu/GET_SIDEMENU',
  SET_SIDEMENU_ITEMS: 'sidemenu/SET_SIDEMENU_ITEMS',
  ADD_TO_SIDEMENU_ITEMS: 'sidemenu/ADD_TO_SIDEMENU_ITEMS'
};

const initialState = {
  current: MAX,
  menuItems: [] as CurrentRouteAndIcon[]
};

export type SideMenuState = Readonly<typeof initialState>;

export interface ISideMenuRootState {
  readonly sideMenuState: SideMenuState;
}

export default (state: SideMenuState = initialState, action): SideMenuState => {
  switch (action.type) {
    case ACTION_TYPES.SET_SIDEMENU:
      const current = state.current;
      const toBe: string = action.payload;
      let willBe = toBe;

      switch (toBe) {
        case MAX:
          willBe = current === TO_MAX ? MAX : TO_MAX;
          break;
        case MINI:
          willBe = current === TO_MINI ? MINI : TO_MINI;
          break;
        default:
          willBe = toBe;
      }

      if (willBe !== toBe) {
        setTimeout(() => setSideMenu(toBe), 300);
      }

      return {
        ...state,
        current: toBe
      };
    case ACTION_TYPES.GET_SIDEMENU:
      return state;
    case ACTION_TYPES.SET_SIDEMENU_ITEMS:
      const menuItems: CurrentRouteAndIcon[] = action.payload;
      return {
        ...state,
        menuItems
      };
    case ACTION_TYPES.ADD_TO_SIDEMENU_ITEMS:
      const mm: CurrentRouteAndIcon[] = action.payload;
      const m = [...mm.filter(a => !state.menuItems.some(b => b.path === a.path)), ...state.menuItems];
      return {
        ...state,
        menuItems: m
      };
    default:
      return state;
  }
};
export const addToMenuItems = (s: CurrentRouteAndIcon[]) => ({
  type: ACTION_TYPES.ADD_TO_SIDEMENU_ITEMS,
  payload: s
});

export const setMenuItems = (s: CurrentRouteAndIcon[]) => ({
  type: ACTION_TYPES.SET_SIDEMENU_ITEMS,
  payload: s
});

export const setSideMenu = s => ({
  type: ACTION_TYPES.SET_SIDEMENU,
  payload: s
});

export const getSideMenuState = () => ({
  type: ACTION_TYPES.GET_SIDEMENU
});
