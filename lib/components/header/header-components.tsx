import React from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

export const NavDropdown = props => (
  <UncontrolledDropdown nav inNavbar id={props.id}>
    <DropdownToggle nav caret className="d-flex align-items-center">
      <span>{props.name}</span>
    </DropdownToggle>
    <DropdownMenu right style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/spoon-ui.svg" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
  </NavbarBrand>
);

export const Notification = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center" />
  </NavItem>
);
