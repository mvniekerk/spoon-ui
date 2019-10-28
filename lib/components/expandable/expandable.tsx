import React, { ReactNode, HTMLAttributes, ReactElement } from 'react';
import cx from 'classnames';
import './expandable.scss';
import { Opener } from '../opener/opener';
import { Collapse } from '../external';

interface IExpandableProps extends HTMLAttributes<HTMLDivElement> {
  mainComponent: ReactElement;
  children: ReactNode;
  openerIcon?: ReactNode;
  openerOpenIcon?: ReactNode;
  openerCloseIcon?: ReactNode;
}

interface IExpandableState {
  open: boolean;
}
/**
 * This component encapsulates the behavior for other components that have
 * main component and expandable popover.
 * Main component is what is shown on the screen by default.
 * All children will go to the popover.
 */
export class Expandable extends React.Component<IExpandableProps> {
  state = {
    open: false
  };

  containerRef = null;

  capture = el => {
    if (el !== null) {
      this.containerRef = el;
    }
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  renderExpandedBody = children => (
    <Collapse isOpen={this.state.open} className="expandable-section">
      {children}
    </Collapse>
  );

  render() {
    const { className, mainComponent, openerIcon, openerOpenIcon, openerCloseIcon, children, ...other } = this.props;

    return (
      <>
        <div ref={this.capture} className={cx(`expandable-container`, className)} {...other}>
          {mainComponent}
          <Opener
            isOpen={this.state.open}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            openComponent={openerIcon || openerOpenIcon}
            closeComponent={openerIcon || openerCloseIcon}
          />
        </div>
        {this.renderExpandedBody(children)}
      </>
    );
  }
}
