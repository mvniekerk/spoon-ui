import './action-banner.scss';

import React, { CSSProperties } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Translate } from 'react-jhipster';

import { SideMenu as SideMenuReducer } from '../../reducers';
import Button from '../button/button';

const { setSideMenu, getSideMenuState, MAX } = SideMenuReducer.sideMenu;

export interface IActionBannerProps extends RouteComponentProps<any> {}

interface IActionBanner extends StateProps, DispatchProps, IActionBannerProps {}

export interface IHeaderState {
  menuOpen: boolean;
  width: number;
}

class ActionBanner extends React.Component<IActionBanner, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false,
    width: 480
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    if (window.innerWidth < 500) {
      this.setState({ width: 450 });
    } else {
      const update_width = window.innerWidth - 100;
      this.setState({ width: update_width });
    }
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  render() {
    const headerStyle: CSSProperties = { backgroundColor: 'transparent' };
    const menuItem = this.props.menus.find(b => b.path === this.props.location.pathname);
    const headerText = !!menuItem &&
      !!menuItem.header && (
        <h1 style={{ flex: 'auto' }}>
          <Translate contentKey={menuItem.header} />
        </h1>
      );
    const breadCrumb = !!menuItem &&
      !!menuItem.breadCrumb &&
      menuItem.breadCrumb.length > 0 && (
        <Breadcrumb className="action-banner-bread-crumb" style={{ ...headerStyle }}>
          {menuItem.breadCrumb.map(b => (
            <BreadcrumbItem key={b.path} tag="a" href={b.path}>
              <Translate contentKey={b.name} />
            </BreadcrumbItem>
          ))}
          <BreadcrumbItem active>
            <Translate contentKey={menuItem.name} />
          </BreadcrumbItem>
        </Breadcrumb>
      );
    const hasBreadCrumb = !!breadCrumb;
    const actions = !!menuItem &&
      !!menuItem.actions &&
      menuItem.actions.length > 0 && (
        <div className="action-buttons">
          {menuItem.actions.map((a, i) => (
            <Button key={`ab${i}`} {...a} />
          ))}
        </div>
      );
    const hasContents = !!menuItem && (!!menuItem.header || hasBreadCrumb || actions);
    return (
      !!hasContents && (
        <div
          className={`action-banner ${this.props.menuSize === MAX ? 'max' : 'mini'} ${hasBreadCrumb ? 'breadcrumbed' : ''}`}
          style={headerStyle}
        >
          {breadCrumb}
          <div className="nav-header-text" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {headerText}
            {actions}
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = ({ sideMenuState }: SideMenuReducer.ISideMenuRootState) => ({
  menus: sideMenuState.menuItems,
  menuSize: sideMenuState.current
});

const mapDispatchToProps = { getSideMenuState, setSideMenu };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter<IActionBannerProps>(connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ActionBanner) as any);
