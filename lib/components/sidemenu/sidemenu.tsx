import './sidemenu.scss';

import React from 'react';
import { Locale, SideMenu as SideMenuReducer } from '../../reducers/index';
import { connect } from 'react-redux';
import { MenuItem } from './menuitem';
import { RouteComponentProps, withRouter } from 'react-router';
import Menu from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ILocaleRootState = Locale.ILocaleRootState;

const { setSideMenu, getSideMenuState, MAX, MINI, TO_MAX, TO_MINI, HIDE_MAX, HIDE_MINI } = SideMenuReducer.sideMenu;

export interface ISideMenuSetableProps extends RouteComponentProps<any> {
  logo?: string;
}

interface ISideMenuProps extends StateProps, DispatchProps, ISideMenuSetableProps {}

export class SideMenu extends React.Component<ISideMenuProps, {}> {
  componentDidMount() {
    this.props.getSideMenuState();
    window.addEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    if (!this.props) {
      return;
    }
    const width = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;

    const current = this.props.sideMenu;

    if (width < 580 && current in [MAX, MINI]) {
      this.props.setSideMenu(current === MAX ? HIDE_MAX : HIDE_MINI);
    } else if (width >= 580 && current in [HIDE_MINI, HIDE_MAX]) {
      this.props.setSideMenu(current === HIDE_MAX ? MAX : MINI);
    }
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  menuExpand = () => {
    this.props.setSideMenu(MAX);
  };

  menuContract = () => {
    this.props.setSideMenu(MINI);
  };

  SideMenuLogo = props => (
    <div {...props} className="side-menu-logo">
      {!!this.props.logo && <img src={this.props.logo} alt="Logo" />}
      <div className="side-menu-close" onClick={this.menuContract}>
        <ChevronLeft />
      </div>
    </div>
  );

  SideMenuHamburger = props => (
    <div {...props} className="side-menu-logo side-menu-hamburger" onClick={this.menuExpand}>
      <Menu />
    </div>
  );

  render() {
    if (this.props.sideMenu! in [MAX, MINI]) {
      return null;
    }
    const max = this.props.sideMenu === MAX;
    const toMax = this.props.sideMenu === TO_MAX;
    const mini = this.props.sideMenu === MINI;
    const toMini = this.props.sideMenu === TO_MINI;

    const logo = max ? <this.SideMenuLogo {...this.props} /> : <this.SideMenuHamburger {...this.props} />;
    const menus = this.props.menus
      .filter(e => e.sideMenu)
      .map(e => <MenuItem icon={e.icon} currentRoute={e} {...this.props} key={e.name} />);
    const text = max ? 'Menu' : '';

    return (
      <div>
        <div className={'side-menu-container' + (max ? '' : ' side-menu-container-mini')}>
          {logo}
          <p className="small-header menu-item-header">{text}</p>
          <ul>{menus}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sideMenuState, locale }: SideMenuReducer.ISideMenuRootState & ILocaleRootState) => ({
  sideMenu: sideMenuState.current,
  menus: sideMenuState.menuItems,
  locale: locale.currentLocale
});

const mapDispatchToProps = { getSideMenuState, setSideMenu };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter<ISideMenuSetableProps>(connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu) as any);
