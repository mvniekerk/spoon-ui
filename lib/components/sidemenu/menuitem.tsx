import './menuitem.scss';

import React from 'react';
import { SideMenu, CurrentRouteAndIcon } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Translate } from 'react-jhipster';
import { NavLink } from 'react-router-dom';
const { getSideMenuState, MAX } = SideMenu.sideMenu;

export interface IMenuItemProps extends StateProps, DispatchProps, RouteComponentProps<any> {
  currentRoute: CurrentRouteAndIcon;
  icon: JSX.Element;
}

export interface IMenuItemStats {
  didMountRender: boolean;
}

export class MenuItem extends React.Component<IMenuItemProps, IMenuItemStats> {
  componentDidMount() {
    this.props.getSideMenuState();
    this.setState({ didMountRender: true });
    this.forceUpdate();
  }

  navigate() {}

  render() {
    const thisMatches = this.props.location.pathname === this.props.currentRoute.path;
    const text = this.props.sideMenu !== MAX ? null : <Translate contentKey={this.props.currentRoute.name} />;
    const divName = 'menu-item' + (this.props.sideMenu === MAX ? ' menu-item-with-text' : '') + (thisMatches ? ' menu-item-selected' : '');

    return (
      <li onClick={this.navigate}>
        <div className={divName}>
          <NavLink to={this.props.currentRoute.path}>
            <div className="menu-item-icon">{this.props.icon}</div>
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

const mapDispatchToProps = { getSideMenuState };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter<IMenuItemProps>(connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem) as any);
