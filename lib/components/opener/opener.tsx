import React, { ReactNode, HTMLAttributes, Ref } from 'react';
import './opener.scss';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

interface IOpenerProps extends HTMLAttributes<{}> {
  isOpen: boolean;
  openComponent?: ReactNode;
  closeComponent?: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * This component is used as a trigger for any other component
 * that should be shown after click on Opener.
 */
export class Opener extends React.Component<IOpenerProps> {
  handleOpenClicked = () => {
    this.props.onOpen && this.props.onOpen();
  };

  handleCloseClicked = () => {
    this.props.onClose && this.props.onClose();
  };

  render() {
    const className = 'opener-icon' + (this.props.className ? ` ${this.props.className}` : '');

    const expand = (
      <div className={className} onClick={this.handleOpenClicked}>
        {this.props.openComponent ? this.props.openComponent : <ExpandMore />}
      </div>
    );

    const collapse = (
      <div className={className} onClick={this.handleCloseClicked}>
        {this.props.closeComponent ? this.props.closeComponent : <ExpandLess />}
      </div>
    );

    return <>{this.props.isOpen ? collapse : expand}</>;
  }
}
