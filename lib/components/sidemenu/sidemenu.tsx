import './sidemenu.scss';

import React from 'react';
import { Locale, SideMenu as SideMenuReducer } from '../../reducers/index';
import { connect } from 'react-redux';
import { SideMenuItem } from './sidemenuitem';
import { RouteComponentProps, withRouter } from 'react-router';
import Menu from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ILocaleRootState = Locale.ILocaleRootState;
import { ScrollableArea } from '../scrollable-area/scrollable-area';

const { setSideMenu, MAX, MINI, HIDE_MAX, HIDE_MINI } = SideMenuReducer.sideMenu;

export interface ISideMenuSetableProps extends RouteComponentProps<any> {
  logo?: string;
  title?: string;
}

interface ISideMenuProps extends StateProps, DispatchProps, ISideMenuSetableProps {}

class SideMenu extends React.Component<ISideMenuProps, {}> {
  componentDidMount() {
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

  SideMenuLogo = ({ logo }) => (
    <div className="side-menu-logo">
      {!!logo && <img src={logo} alt="Logo" />}
      <div className="side-menu-close" onClick={this.menuContract}>
        <ChevronLeft />
      </div>
    </div>
  );

  SideMenuHamburger = props => (
    <div className="side-menu-logo side-menu-hamburger" onClick={this.menuExpand}>
      <Menu />
    </div>
  );

  render() {
    if (this.props.sideMenu! in [MAX, MINI]) {
      return null;
    }
    const max = this.props.sideMenu === MAX;

    const logo = max ? <this.SideMenuLogo logo={this.props.logo} /> : <this.SideMenuHamburger {...this.props} />;
    const menus = this.props.menus
      .filter(e => e.sideMenu)
      .map(e => <SideMenuItem icon={e.icon} currentRoute={e} {...this.props} key={e.name} />);

    return (
      <div>
        <div className={'side-menu-container' + (max ? '' : ' side-menu-container-mini')}>
          {logo}
          {this.props.title && <p className="small-header menu-item-header">{this.props.title}</p>}
          <ScrollableArea tag="ul" className={!!this.props.title ? '' : 'without-title'}>
            {menus}
          </ScrollableArea>
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

const mapDispatchToProps = { setSideMenu };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const connected = withRouter<ISideMenuSetableProps>(connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu) as any);

export { connected as SideMenu };
