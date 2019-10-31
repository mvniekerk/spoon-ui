import './sidemenuitem.scss';

import React from 'react';
import { SideMenu, sideMenu, CurrentRouteAndIcon } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Translate } from 'react-jhipster';
import { NavLink } from 'react-router-dom';
const { MAX } = sideMenu;

export interface IMenuItemProps extends StateProps, RouteComponentProps<any> {
  currentRoute: CurrentRouteAndIcon;
  icon: JSX.Element;
}

class SideMenuItem extends React.Component<IMenuItemProps> {
  navigate = () => {
    this.props.history.push(this.props.currentRoute.path);
  };

  render() {
    const thisMatches = this.props.location.pathname === this.props.currentRoute.path;
    const text = this.props.sideMenu !== MAX ? null : <Translate contentKey={this.props.currentRoute.name} />;
    const divName =
      'sidemenu-item' + (this.props.sideMenu === MAX ? ' sidemenu-item-with-text' : '') + (thisMatches ? ' sidemenu-item-selected' : '');

    return (
      <li onClick={this.navigate}>
        <div className={divName}>
          <NavLink to={this.props.currentRoute.path}>
            <div className="sidemenu-item-icon">{this.props.icon}</div>
            {text}
          </NavLink>
        </div>
      </li>
    );
  }
}

const mapStateToProps = ({ sideMenuState }: SideMenu.ISideMenuRootState) => ({
  sideMenu: sideMenuState.current
});

type StateProps = ReturnType<typeof mapStateToProps>;

const connected = withRouter<IMenuItemProps>(connect<StateProps>(mapStateToProps)(SideMenuItem) as any);

export { connected as SideMenuItem };
