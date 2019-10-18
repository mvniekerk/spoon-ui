import React, { ReactNode, HTMLAttributes } from 'react';
import { List, Grid, SimpleMenu, ISimpleMenuItem, Row, Col, Label, Expandable, Button } from 'lib/components';
import Navigate from '@material-ui/icons/NavigateNextSharp';

import './styles.scss';

interface IContainersExamplesState {
  data: any[];
  actions: ISimpleMenuItem[];
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
    ]
  };

  renderListItem = item => <div className="item-example">{item.value}</div>;

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
        </Row>
      </>
    );
  }
}
