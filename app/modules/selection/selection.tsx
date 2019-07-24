import './selection.scss';

import React from 'react';
import { Row, Col, FormGroup, Label, Card } from 'reactstrap';
/* tslint:disable:no-submodule-imports */
import { RadioGroup, Toggle, Checkbox, IRadioButtonValue, ITextTranslationAndValue } from 'lib/components';
import AddToFromList from 'lib/components/add-to-from-list/add-to-from-list';
/* tslint:enable:no-submodule-imports */

export default class Selection extends React.Component {
  render() {
    const radioGroupVals = [
      {
        label: 'Option 1',
        id: 'option1',
        value: 'value1',
        disabled: false,
        checked: true
      },
      {
        label: 'Option 2',
        id: 'option2',
        value: 'value2',
        disabled: false,
        checked: true
      },
      {
        label: 'Option 3',
        id: 'option3',
        value: 'value3',
        disabled: true,
        checked: true
      }
    ];

    const lonesomeChecked: Array<IRadioButtonValue<string>> = [
      {
        label: 'Option 4',
        id: 'option4',
        value: 'value4',
        disabled: true,
        checked: true
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
                <Checkbox name="checkbox" label="Label" checked />
                <Checkbox name="checkbox" label="Label" />
                <Checkbox name="checkbox" label="Disabled unchecked" disabled />
                <Checkbox name="checkbox" label="Disabled checked" checked disabled />
                {/*<CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Or this one" />*/}
                {/*<CustomInput type="checkbox" id="exampleCustomCheckbox3" label="But not this disabled one" disabled />*/}
              </div>
            </FormGroup>
          </Col>
          <Col md="4">
            <div className="small-header">Radio buttons</div>
            <FormGroup>
              <Label for="exampleCheckbox">Radio button label</Label>
              <RadioGroup values={radioGroupVals} name="radGroup1" />
              <RadioGroup values={lonesomeChecked} name="radGroup2" />
            </FormGroup>
          </Col>
          <Col md="4">
            <div className="small-header">Toggle buttons</div>
            <FormGroup>
              <Label for="toggle1">Toggle buttons</Label>
              <div>
                <Toggle name="toggle1" label="Enabled" />
                <br />
                <Toggle name="toggle1" label="Disabled off" disabled />
                <br />
                <Toggle name="toggle1" label="Disabled on" disabled checked />
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
