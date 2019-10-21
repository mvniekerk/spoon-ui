import React, { ReactNode, HTMLAttributes, ReactElement } from 'react';
import './expandable.scss';
import { Opener } from '../opener/opener';
import { Collapse } from '../external';

interface IExpandableProps extends HTMLAttributes<{}> {
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

  renderExpandedBody = () => (
    <Collapse isOpen={this.state.open} className="expandable-section">
      {this.props.children}
    </Collapse>
  );

  render() {
    const className = `expandable-container` + (this.props.className ? ` ${this.props.className}` : '');

    return (
      <>
        <div ref={this.capture} className={className}>
          {this.props.mainComponent}
          <Opener
            isOpen={this.state.open}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            openComponent={this.props.openerIcon || this.props.openerOpenIcon}
            closeComponent={this.props.openerIcon || this.props.openerCloseIcon}
          />
        </div>
        {this.renderExpandedBody()}
      </>
    );
  }
}
