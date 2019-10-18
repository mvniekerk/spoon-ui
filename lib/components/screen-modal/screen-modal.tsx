import React, { ReactNode, HTMLAttributes, ReactElement } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

interface IScreenModalProps extends HTMLAttributes<{}> {
  isOpen: boolean;
  headerComponent?: ReactElement;
  footerComponent?: ReactElement;
  children: ReactNode;
  toggle?: () => void;
}

export class ScreenModal extends React.Component<IScreenModalProps> {
  render() {
    return (
      <Modal zIndex={100500} isOpen={this.props.isOpen} toggle={this.props.toggle} centered autoFocus returnFocusAfterClose size="lg">
        <ModalHeader toggle={this.props.toggle}>{this.props.headerComponent}</ModalHeader>
        <ModalBody>{this.props.children}</ModalBody>
        {this.props.footerComponent ? <ModalFooter>{this.props.footerComponent}</ModalFooter> : null}
      </Modal>
    );
  }
}
