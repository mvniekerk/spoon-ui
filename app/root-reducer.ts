import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import { reducer as applicationProfile, ApplicationProfileState } from 'lib/reducers/application-profile';
import { SideMenu, sideMenu, Locale, locale } from 'lib/reducers';

// prettier-ignore: sideMenu.sideMenuState
export interface IRootState extends SideMenu.ISideMenuRootState, Locale.ILocaleRootState {
  readonly applicationProfile: ApplicationProfileState;
  readonly loadingBar: any;
}

const sideMenuState = sideMenu.sideMenuState;

const rootReducer = combineReducers<IRootState>({
  locale: locale.localeState,
  applicationProfile,
  loadingBar,
  sideMenuState
});

export default rootReducer;
