import './header.scss';

import React from 'react';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import { Brand } from './header-components';

export interface IHeaderState {
  menuOpen: boolean;
  width: number;
}

export class Header extends React.Component<{}, IHeaderState> {
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
    const brand = this.state.width < 480 ? <Brand /> : null;
    return (
      <div>
        <LoadingBar className="loading-bar" />
        <Navbar expand="sm" fixed="top" className="gbl-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          {brand}
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              {this.props.children}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
