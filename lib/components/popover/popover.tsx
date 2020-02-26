import React, { ReactNode, HTMLAttributes, KeyboardEvent } from 'react';
import { Popover as RPopover, PopoverProps, PopoverBody } from 'reactstrap';
import keycode from 'keycode';
import outerClick from 'react-outerclick';
import './popover.scss';

export interface IPopoverProps extends HTMLAttributes<{}> {
  target: string | HTMLElement;
  container: string | HTMLElement;
  isOpen: boolean;
  placement?: Extract<PopoverProps, 'placement'>;
  flip?: boolean;
  delay?: number | { show: number; hide: number };
  onSelfClickClose?: boolean;
  children: ReactNode;
  autoClose?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

interface IPopoverState {
  open: boolean;
}

class Popover extends React.Component<IPopoverProps, IPopoverState> {
  state = {
    open: this.props.isOpen
  };

  popoverEl = null;

  constructor(props) {
    super(props);
    this.handleOuterClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({
        open: this.props.isOpen
      });

      if (this.props.isOpen) {
        this.props.onOpen && this.props.onOpen();
      } else {
        this.props.onClose && this.props.onClose();
      }
    }
  }

  capturePopover = el => {
    if (el) {
      this.popoverEl = el;
    }
  };

  private close = () => {
    this.setState({ open: false });
    this.props.onClose && this.props.onClose();
  };

  handleClick = () => {
    if (this.props.onSelfClickClose) {
      this.close();
    }
  };

  handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (keycode((e as unknown) as Event) === 'esc') {
      this.close();
    }
  };

  // this method should not be an arrow function!
  handleOuterClick(e) {
    if (this.props.autoClose && this.state.open) {
      // check that clicked element is not inside the popup
      if (this.popoverEl && !this.popoverEl.contains(e.target)) {
        this.close();
      }
    }
  }

  render() {
    return (
      // this is needed for outer click to work
      <div>
        <RPopover
          trigger="legacy"
          delay={this.props.delay}
          placement={this.props.placement || 'bottom'}
          flip={this.props.flip || false}
          isOpen={this.state.open}
          modifiers={{ preventOverflow: { enabled: false }, hide: { enabled: false } }}
          target={this.props.target}
          container={this.props.container}
          innerRef={this.capturePopover}
          onClick={this.handleClick}
        >
          <PopoverBody onKeyDown={this.handleKeyDown}>{this.props.children}</PopoverBody>
        </RPopover>
      </div>
    );
  }
}

const Component = outerClick(Popover);

export { Component as Popover };
