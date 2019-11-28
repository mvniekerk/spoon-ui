import React, { ReactNode, ReactElement } from 'react';
import cx from 'classnames';
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

  /**
   * This prop defined whether popover icon should be shown
   */
  noOpener?: boolean;
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

  /**
   * Override the state of the popover from the parent
   */
  isOpen?: boolean;

  /**
   * If true, the popover can not be opened
   */
  disabled?: boolean;
}

interface IWithPopoverState {
  open: boolean;
}

export class WithPopover extends React.Component<IWithPopoverProps, IWithPopoverState> {
  state = {
    open: this.props.isOpen
  };

  containerRef = null;
  targetRef = null;
  targetInnerRef = null;

  componentWillReceiveProps(nextProps: IWithPopoverProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({
        open: nextProps.isOpen
      });
    }
  }

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
    const className = cx('with-popover', this.props.className);

    return (
      <div ref={this.captureContainer} className={className}>
        {React.cloneElement(this.props.mainComponent, {
          ref: this.captureTargetRef,
          innerRef: this.captureTargetInnerRef,
          onClick: this.handleMainClick
        })}
        {this.props.noOpener ? null : (
          <Opener
            disabled={this.props.disabled}
            isOpen={this.state.open}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            openComponent={this.props.openerIcon || this.props.openerOpenIcon}
            closeComponent={this.props.openerIcon || this.props.openerCloseIcon}
          />
        )}
        {this.renderExpandedBody()}
      </div>
    );
  }
}
