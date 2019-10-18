import React, { ReactNode, HTMLAttributes } from 'react';
import { ScreenModal, Row, Col, Label, Button, WithPopover } from 'lib/components';

interface IModalsPopoversState {
  open: boolean;
}

export class ModalsPopovers extends React.Component<any, IModalsPopoversState> {
  state: IModalsPopoversState = {
    open: false
  };

  openModal = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <>
        <Row>
          <Col>
            <Label>ScreenModal</Label>
            <Button onClick={this.openModal}>Open Modal</Button>
            <ScreenModal
              isOpen={this.state.open}
              headerComponent={<h1>Header text</h1>}
              footerComponent={<h1>Footer text</h1>}
              toggle={this.openModal}
            >
              ScreenModal content
            </ScreenModal>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>WithPopover</Label>
            <WithPopover mainComponent={<div style={{ background: 'white' }}>Click on the chevron icon -></div>}>
              Popover content
            </WithPopover>
          </Col>
          <Col>
            <Label>WithPopover (autoOpen + closeOnMainClick)</Label>
            <WithPopover autoOpen closeOnMainClick mainComponent={<div style={{ background: 'white' }}>Click on me to open and close</div>}>
              Popover content
            </WithPopover>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>WithPopover (autoOpen + autoClose)</Label>
            <WithPopover
              autoClose
              autoOpen
              mainComponent={<div style={{ background: 'white' }}>Click on me, then click anywhere outside</div>}
            >
              Popover content
            </WithPopover>
          </Col>
          <Col>
            <Label>WithPopover (autoOpen + onSelfClickClose)</Label>
            <WithPopover
              autoOpen
              onSelfClickClose
              mainComponent={<div style={{ background: 'white' }}>Click on me, then click inside popover</div>}
            >
              Click here to close
            </WithPopover>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>WithPopover (autoOpen + autoClose + closeOnMainClick + onSelfClickClose)</Label>
            <WithPopover
              autoOpen
              autoClose
              closeOnMainClick
              onSelfClickClose
              mainComponent={<div style={{ background: 'white' }}>Chevron, self, ouside and popover click will close it</div>}
            >
              Click here to close
            </WithPopover>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>WithPopover (autoOpen + autoClose + closeOnMainClick)</Label>
            <WithPopover
              autoOpen
              autoClose
              closeOnMainClick
              mainComponent={
                <div style={{ background: 'white' }}>
                  It can have custom content:
                  <Button>This is a button</Button>
                </div>
              }
            >
              <Button>This is another button</Button>
            </WithPopover>
          </Col>
          <Col />
        </Row>
      </>
    );
  }
}
