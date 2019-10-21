import React, { ReactNode, ReactElement } from 'react';
import { Popover, IPopoverProps } from '../popover/popover';
import { Opener } from '../opener/opener';
import './with-popover.scss';

interface IWithPopoverProps extends Omit<IPopoverProps, 'isOpen' | 'children' | 'container' | 'target'> {
  mainComponent: ReactElement;
  children: ReactNode;

  /**
   * The element this popover will point to.
   * If not specified, mainComponent will be pointed.
   */
  target?: string | HTMLElement;
  /**
   * The element that will be a container for popover.
   * Popover will be attached to that element and will sit within it.
   * If not specified, the container of the mainComponent will be used.
   */
  container?: string | HTMLElement;

  openerIcon?: ReactNode;
  openerOpenIcon?: ReactNode;
  openerCloseIcon?: ReactNode;

  /**
   * If true, the popover will be closed when clicked outside popover.
   */
  autoClose?: boolean;

  /**
   * If true, the popover will be opened when mainComponent is clicked.
   */
  autoOpen?: boolean;

  /**
   *  If true, the popover will be closed when mainComponent is clicked.
   */
  closeOnMainClick?: boolean;

  /**
   *  If true, the popover will be closed when popover body is clicked.
   */
  onSelfClickClose?: boolean;
}

interface IWithPopoverState {
  open: boolean;
}

export class WithPopover extends React.Component<IWithPopoverProps, IWithPopoverState> {
  state = {
    open: false
  };

  containerRef = null;
  targetRef = null;
  targetInnerRef = null;

  captureContainer = el => {
    if (el) {
      this.containerRef = el;
    }
  };

  captureTargetRef = el => {
    if (el) {
      this.targetRef = el;
    }
  };

  captureTargetInnerRef = el => {
    if (el) {
      this.targetInnerRef = el;
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

  handleMainClick = () => {
    if (this.props.autoOpen) {
      if (this.state.open && this.props.closeOnMainClick) {
        this.handleClose();
      } else {
        this.handleOpen();
      }
    }
  };

  renderExpandedBody = () => (
    <Popover
      {...this.props}
      isOpen={this.state.open}
      autoClose={this.props.autoClose}
      target={this.props.target ? this.props.target : this.targetInnerRef || this.targetRef}
      container={this.props.container ? this.props.container : this.containerRef}
      onOpen={this.handleOpen}
      onClose={this.handleClose}
    >
      {this.props.children}
    </Popover>
  );

  render() {
    const className = `with-popover` + (this.props.className ? ` ${this.props.className}` : '');

    return (
      <div ref={this.captureContainer} className={className}>
        {React.cloneElement(this.props.mainComponent, {
          ref: this.captureTargetRef,
          innerRef: this.captureTargetInnerRef,
          onClick: this.handleMainClick
        })}
        <Opener
          isOpen={this.state.open}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          openComponent={this.props.openerIcon || this.props.openerOpenIcon}
          closeComponent={this.props.openerIcon || this.props.openerCloseIcon}
        />
        {this.renderExpandedBody()}
      </div>
    );
  }
}
