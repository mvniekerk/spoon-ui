import React, { ReactNode, HTMLAttributes } from 'react';
import { List, Grid, SimpleMenu, ISimpleMenuItem, Row, Col, Label, Expandable, Button, ContextMenu } from 'lib/components';
import Navigate from '@material-ui/icons/NavigateNextSharp';

import './styles.scss';

interface IContainersExamplesState {
  data: any[];
  actions: ISimpleMenuItem[];
  contextMenuItems: ISimpleMenuItem[];
}

export class ContainersExamples extends React.Component<any, IContainersExamplesState> {
  state: IContainersExamplesState = {
    data: [
      { value: 'one' },
      { value: 'two' },
      { value: 'three' },
      { value: 'four' },
      { value: 'five' },
      { value: 'six' },
      { value: 'seven' },
      { value: 'eight' },
      { value: 'nine' },
      { value: 'ten' }
    ],
    actions: [
      {
        label: 'menus.selection',
        onClick: () => {
          alert('menu item onClick');
        }
      },
      {
        actionIcon: <Navigate />,
        label: 'menus.navigation',
        onClick: () => {
          alert('menu item onClick');
        }
      }
    ],
    contextMenuItems: [
      {
        labelText: 'Your account',
        onClick: () => {
          alert('Your account clicked');
        }
      },
      {
        labelText: 'Settings',
        onClick: () => {
          alert('Settings clicked');
        }
      },
      {
        labelText: 'Map',
        onClick: () => {
          alert('Map clicked');
        }
      }
    ]
  };

  renderListItem = item => <div className="item-example">{item.value}</div>;

  renderRowExamples = () => (
    <>
      <div className="layout-examples">
        <Label>Row (default)</Label>
        <Row>
          <div className="col-example">Item 1</div>
          <div className="col-example">Item 2</div>
          <div className="col-example">Item 3</div>
        </Row>

        <Label>Row (justify=start)</Label>
        <Row justify="start">
          <div className="col-example">Item 1</div>
          <div className="col-example">Item 2</div>
          <div className="col-example">Item 3</div>
        </Row>

        <Label>Row (justify=end)</Label>
        <Row justify="end">
          <div className="col-example">Item 1</div>
          <div className="col-example">Item 2</div>
          <div className="col-example">Item 3</div>
        </Row>

        <Label>Row (justify=center)</Label>
        <Row justify="center">
          <div className="col-example">Item 1</div>
          <div className="col-example">Item 2</div>
          <div className="col-example">Item 3</div>
        </Row>

        <Label>Row (justify=between)</Label>
        <Row justify="between">
          <div className="col-example">Item 1</div>
          <div className="col-example">Item 2</div>
          <div className="col-example">Item 3</div>
        </Row>

        <Label>Row (justify=around)</Label>
        <Row justify="around">
          <div className="col-example">Item 1</div>
          <div className="col-example">Item 2</div>
          <div className="col-example">Item 3</div>
        </Row>
      </div>
    </>
  );

  renderRowColExamples = () => (
    <>
      <div className="layout-examples">
        <Label>Row + Col (default)</Label>
        <Row>
          <Col>
            <div className="col-example">Item 1</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="col-example">Item 1</div>
          </Col>
          <Col>
            <div className="col-example">Item 2</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="col-example">Item 1</div>
          </Col>
          <Col>
            <div className="col-example">Item 2</div>
          </Col>
          <Col>
            <div className="col-example">Item 3</div>
          </Col>
        </Row>

        <Label>Row + Col (justify=start)</Label>
        <Row>
          <Col justify="start">
            <div className="col-example"> Item 1 </div>
          </Col>
        </Row>
        <Row>
          <Col justify="start">
            <div className="col-example">Item 1</div>
          </Col>
          <Col justify="start">
            <div className="col-example">Item 2</div>
          </Col>
        </Row>
        <Row>
          <Col justify="start">
            <div className="col-example">Item 1</div>
          </Col>
          <Col justify="start">
            <div className="col-example">Item 2</div>
          </Col>
          <Col justify="start">
            <div className="col-example">Item 3</div>
          </Col>
        </Row>

        <Label>Row + Col (justify=end)</Label>
        <Row>
          <Col justify="end">
            <div className="col-example"> Item 1 </div>
          </Col>
        </Row>
        <Row>
          <Col justify="end">
            <div className="col-example">Item 1</div>
          </Col>
          <Col justify="end">
            <div className="col-example">Item 2</div>
          </Col>
        </Row>
        <Row>
          <Col justify="end">
            <div className="col-example">Item 1</div>
          </Col>
          <Col justify="end">
            <div className="col-example">Item 2</div>
          </Col>
          <Col justify="end">
            <div className="col-example">Item 3</div>
          </Col>
        </Row>

        <Label>Row + Col (justify=center)</Label>
        <Row>
          <Col justify="center">
            <div className="col-example"> Item 1 </div>
          </Col>
        </Row>
        <Row>
          <Col justify="center">
            <div className="col-example">Item 1</div>
          </Col>
          <Col justify="center">
            <div className="col-example">Item 2</div>
          </Col>
        </Row>
        <Row>
          <Col justify="center">
            <div className="col-example">Item 1</div>
          </Col>
          <Col justify="center">
            <div className="col-example">Item 2</div>
          </Col>
          <Col justify="center">
            <div className="col-example">Item 3</div>
          </Col>
        </Row>

        <Label>Row + Col (justify=center, grow=0, basis=150px)</Label>
        <Row>
          <Col justify="center" grow={0} basis="150px">
            <div className="col-example"> Item 1 </div>
          </Col>
        </Row>
        <Row>
          <Col justify="center" grow={0} basis="150px">
            <div className="col-example">Item 1</div>
          </Col>
          <Col justify="center">
            <div className="col-example">Item 2</div>
          </Col>
        </Row>
        <Row>
          <Col justify="center" grow={0} basis="150px">
            <div className="col-example">Item 1</div>
          </Col>
          <Col justify="center">
            <div className="col-example">Item 2</div>
          </Col>
          <Col justify="center">
            <div className="col-example">Item 3</div>
          </Col>
        </Row>
      </div>
    </>
  );

  render() {
    return (
      <>
        <Row>
          <Col>
            <Label>List</Label>
            <div className="list-container">
              <List scrollable items={this.state.data} itemRender={this.renderListItem} />
            </div>
          </Col>
          <Col>
            <Label>Grid</Label>
            <div className="grid-container">
              <Grid scrollable items={this.state.data} itemRender={this.renderListItem} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>SimpleMenu</Label>
            <div className="menu-container">
              <SimpleMenu items={this.state.actions} />
            </div>
          </Col>
          <Col>
            <Label>Expandable</Label>
            <Expandable
              mainComponent={
                <div style={{ background: 'white' }}>
                  This is an expandable component with custom content
                  <Button>I am a button</Button>
                </div>
              }
            >
              <Button>Me too</Button>
              <SimpleMenu items={this.state.actions} />
            </Expandable>
          </Col>
          <Col md="2">
            <div className="small-header">Context menu</div>
            <ContextMenu items={this.state.contextMenuItems} />
          </Col>
        </Row>

        <div className="small-header">Row Layout Examples</div>
        {this.renderRowExamples()}

        <div className="small-header">Row + Col Layout Examples</div>
        {this.renderRowColExamples()}
      </>
    );
  }
}
