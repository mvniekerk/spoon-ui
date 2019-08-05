import './forms.scss';

import React from 'react';
import { Row, Col, Input, InputGroup, FormText, FormFeedback, FormGroup, Label, Card } from 'reactstrap';

/* tslint:disable:no-submodule-imports */
import { TagInput, SearchBar, TextInput } from 'lib/components';
import { ITranslatedSelectableValue } from 'lib/util';
import { requiredString, stringIsNumber } from 'lib/validation';
/* tslint:enable:no-submodule-imports */

import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import CalendarToday from '@material-ui/icons/CalendarToday';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Info from '@material-ui/icons/Info';
import Cancel from '@material-ui/icons/Cancel';

export interface IFormsState {
  values: Array<ITranslatedSelectableValue<string>>;
  search?: string;
  numberInput: string;
  numberInputDirty: boolean;
}

export default class Forms extends React.Component<{}, IFormsState> {
  state: IFormsState = {
    values: [],
    search: '',
    numberInput: '',
    numberInputDirty: false
  };

  constructor(props) {
    super(props);
    this.onAddTag = this.onAddTag.bind(this);
    this.searchChanged = this.searchChanged.bind(this);
  }

  onAddTag(a: ITranslatedSelectableValue<string>) {
    if (!!a) {
      this.setState(p => ({
        values: [...p.values, a]
      }));
    }
  }

  searchChanged(search: string) {
    this.setState({ search });
  }

  render() {
    const onNumberInputChange = numberInput => this.setState({ numberInput });
    const onNumberInputMadeDirty = () => this.setState({ numberInputDirty: true });
    return (
      <>
        <Row>
          <Col md="4">
            <Input placeholder="Placeholder" />
            <div className="small-header">Text Inputs</div>
            <Input text="Text" value="Has Text" />

            <InputGroup className="is-valid">
              <Input valid placeholder="Placeholder" value="Correct input" />
              <Check className="material-icons valid-icon" />
            </InputGroup>
            <InputGroup className="is-invalid">
              <Input invalid placeholder="Placeholder" value="Incorrect input" />
              <Clear className="material-icons invalid-icon" />
            </InputGroup>
            <Input text="Text" value="Disabled" disabled />
          </Col>
          <Col md="4">
            <div className="small-header">With icon</div>
            <InputGroup className="input-group-icon-left">
              <Input placeholder="Placeholder" />
              <CalendarToday className="material-icons left-icon" />
            </InputGroup>

            <InputGroup className="input-group-icon-left">
              <Input placeholder="Placeholder" value="Has Text" />
              <PersonOutline className="material-icons left-icon" />
            </InputGroup>

            <InputGroup className="is-valid input-group-icon-left">
              <Input valid placeholder="Placeholder" value="Correct input" />
              <Check className="material-icons valid-icon" />
              <CalendarToday className="material-icons left-icon" />
            </InputGroup>
            <InputGroup className="is-invalid input-group-icon-left">
              <Input invalid placeholder="Placeholder" value="Incorrect input" />
              <Clear className="material-icons invalid-icon" />
              <PersonOutline className="material-icons left-icon" />
            </InputGroup>

            <InputGroup className="input-group-icon-left">
              <Input disabled valid placeholder="Placeholder" value="Disabled" />
              <CalendarToday className="material-icons left-icon" />
            </InputGroup>
          </Col>
          <Col md="4">
            <div className="small-header">With icon right</div>
            <InputGroup className="input-group-icon-right">
              <Input placeholder="Placeholder" />
              <CalendarToday className="material-icons right-icon" />
            </InputGroup>

            <InputGroup className="input-group-icon-right">
              <Input placeholder="Placeholder" value="Has Text" />
              <PersonOutline className="material-icons right-icon" />
            </InputGroup>

            <InputGroup className="is-valid input-group-icon-right">
              <Input valid placeholder="Placeholder" value="Correct input" />
              <Check className="material-icons valid-icon" />
              <CalendarToday className="material-icons right-icon" />
            </InputGroup>
            <InputGroup className="is-invalid input-group-icon-right">
              <Input invalid placeholder="Placeholder" value="Incorrect input" />
              <Clear className="material-icons invalid-icon" />
              <PersonOutline className="material-icons right-icon" />
            </InputGroup>

            <InputGroup className="input-group-icon-right">
              <Input disabled valid placeholder="Placeholder" value="Disabled" />
              <CalendarToday className="material-icons right-icon" />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div className="small-header">Text inputs with labels</div>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="inputwithoutvalidation">Without validation</Label>
              <Input id="inputwithoutvalidation" placeholder="Placeholder" />
            </FormGroup>
            <FormGroup>
              <Label for="inputwithoutvalidation">Required field</Label>
              <Input id="inputwithoutvalidation" placeholder="Placeholder" />
              <FormText>
                <span>
                  <Info className="material-icons" />
                  Example help text that remains unchanged.
                </span>
              </FormText>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="inputwithoutvalidation">Correct field</Label>
              <Input valid placeholder="Placeholder" value="Correct input" />
            </FormGroup>

            <FormGroup>
              <Label for="inputwithoutvalidation">With message</Label>
              <Input valid placeholder="Placeholder" value="Correct input" />
              <FormFeedback valid>
                <Info className="material-icons" />
                Positive message
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="error">With message</Label>
              <Input invalid id="error" placeholder="Placeholder" value="Correct input" />
              <FormFeedback invalid>
                <Cancel className="material-icons" />
                Error notification
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div className="small-header">Text using TextInput component and validations</div>
          </Col>
          <Col md="4">
            <TextInput
              enableTicks
              label="This is my label"
              id="textInputExample"
              placeholder="Value is required and must be a number"
              dirty={this.state.numberInputDirty}
              onMadeDirty={onNumberInputMadeDirty}
              value={this.state.numberInput}
              onChange={onNumberInputChange}
              helpMessage="This field is required"
              validMessage="Well done"
              validation={[{ func: requiredString, i18n: 'Value is required' }, { func: stringIsNumber, i18n: 'Must be a number' }]}
            />
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <SearchBar onSearchChanged={this.searchChanged} />
            <FormFeedback valid>
              <Info className="material-icons" />
              {this.state.search}
            </FormFeedback>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div className="small-header">Async dropdown selection</div>
          </Col>
          <Col md="6">
            <TagInput values={this.state.values} onAddTag={this.onAddTag} />
          </Col>
        </Row>
      </>
    );
  }
}
