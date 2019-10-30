import './selection.scss';

import React from 'react';
import { Row, Col, FormGroup, Label, Card } from 'reactstrap';
import { RadioGroup, Toggle, Checkbox, IRadioButtonValue } from 'lib/components';
import { AddToFromList } from 'lib/components/add-to-from-list/add-to-from-list';

export class Selection extends React.Component {
  render() {
    const radioGroupVals: Array<IRadioButtonValue<string>> = [
      {
        display: 'Option 1',
        id: 'option1',
        value: 'value1',
        disabled: false,
        selected: true
      },
      {
        display: 'Option 2',
        id: 'option2',
        value: 'value2',
        disabled: false,
        selected: true
      },
      {
        display: 'Option 3',
        id: 'option3',
        value: 'value3',
        disabled: true,
        selected: true
      }
    ];

    const lonesomeChecked: Array<IRadioButtonValue<string>> = [
      {
        display: 'Option 4',
        id: 'option4',
        value: 'value4',
        disabled: true,
        selected: true
      }
    ];

    const sourceList = ['Audit', 'Credit', 'Development', 'Devops', 'Graduates', 'HR', 'Management'].map(b => ({
      display: b,
      name: b,
      value: b
    }));

    return (
      <>
        <Row>
          <Col md="4">
            <div className="small-header">Checkboxes</div>

            <FormGroup>
              <Label for="exampleCheckbox">Checkboxes label</Label>
              <div>
                <Checkbox name="checkbox" display="Label" selected />
                <Checkbox name="checkbox" display="Label" />
                <Checkbox name="checkbox" display="Disabled unchecked" disabled />
                <Checkbox name="checkbox" display="Disabled checked" selected disabled />
              </div>
            </FormGroup>
          </Col>
          <Col md="4">
            <div className="small-header">Radio buttons</div>
            <FormGroup>
              <Label for="exampleCheckbox">Radio button label</Label>
              <RadioGroup md={6} values={radioGroupVals} name="radGroup1" />
              <RadioGroup md={6} values={lonesomeChecked} name="radGroup2" />
            </FormGroup>
          </Col>
          <Col md="4">
            <div className="small-header">Radio buttons vertical</div>
            <FormGroup>
              <Label for="exampleCheckbox">Radio button label</Label>
              <RadioGroup vertical values={radioGroupVals} name="radGroup1" />
              <RadioGroup vertical values={lonesomeChecked} name="radGroup2" />
            </FormGroup>
          </Col>
          <Col md="4">
            <div className="small-header">Toggle buttons</div>
            <FormGroup>
              <Label for="toggle1">Toggle buttons</Label>
              <div>
                <Toggle name="toggle1" display="Enabled" value />
                <br />
                <Toggle name="toggle1" display="Disabled off" disabled value={false} />
                <br />
                <Toggle name="toggle1" display="Disabled on" disabled selected value />
                <br />
              </div>
            </FormGroup>
          </Col>
          <Col md="8">
            <div className="small-header">Add to list from searchable list</div>
            <Card>
              <AddToFromList
                helpText="Select a team on the left to assign to John Arnold"
                sourceListHeader="TEAMS"
                destinationListHeader="JOHN ARNOLD TEAMS"
                sourceList={sourceList}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
